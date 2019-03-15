import React, {Component, Fragment} from 'react';
import {BrowserRouter, Redirect, Route, Switch} from 'react-router-dom';
import Grid from "@material-ui/core/Grid";
import './App.css';
import DynamicUserForm from './components/DynamicUserForm/DynamicUserForm';
import SnackbarWrapper from './components/SnackbarWrapper/SnackbarWrapper';
import Home from './components/Home/Home';
import Header from './components/Header/Header';
import DynamicAddPage from './components/DynamicAddPage/DynamicAddPage';
import ViewAllPage from './components/Flavour/ViewAll/ViewAllPage';
import DetailsPage from "./components/Flavour/Details/DetailsPage";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userEmail: null,
            isAdmin: false,
            isModerator: false,
            snackOpened: false,
            snackType: null,
            snackMessage: null,
            sideBarOpened: false,
        };

        this.loginUser = this.loginUser.bind(this);
        this.logout = this.logout.bind(this);
        this.handleSnackClose = this.handleSnackClose.bind(this);
        this.handleSnackOpen = this.handleSnackOpen.bind(this);
        this.toggleMainGridSize = this.toggleMainGridSize.bind(this);
    }

    loginUser(user) {
        fetch('http://localhost:9999/auth/signin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then((data) => {
                if (!data.email) {
                    this.handleSnackOpen('error', 'Login failed!');
                } else {
                    this.setState({
                        userEmail: data.email,
                        isAdmin: data.isAdmin,
                        isModerator: data.isModerator,
                        snackOpened: true,
                        snackType: 'success',
                        snackMessage: 'Login successful!',
                    });
                    sessionStorage.setItem('userId', data.userId);
                    sessionStorage.setItem('token', data.token);
                    if (user.rememberMe) {
                        sessionStorage.setItem('rememberMe', 'checked');
                    }
                }
            });
    }

    logout() {
        this.setState({
            userEmail: null,
            isAdmin: false,
            isModerator: false,
            snackOpened: true,
            snackType: "success",
            snackMessage: "Logout successful!",
        });
        sessionStorage.removeItem('userId');
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('rememberMe');
    }

    handleSnackClose() {
        this.setState({
            snackOpened: false,
            snackType: null,
            snackMessage: null
        });

    }

    handleSnackOpen(snackType, snackMessage) {
        this.setState({
            snackOpened: true,
            snackType,
            snackMessage
        });
    }

    toggleMainGridSize() {
        this.setState({
            sideBarOpened: !this.state.sideBarOpened,
        })
    }

    componentDidMount() {
        if (sessionStorage.getItem('rememberMe')) {
            const token = sessionStorage.getItem('token');

            fetch('http://localhost:9999/auth/signin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token,
                },
            })
                .then((resp) => {
                    if (resp.status === 200) {
                        return resp.json();
                    } else {
                        sessionStorage.removeItem('userId');
                        sessionStorage.removeItem('token');
                        sessionStorage.removeItem('rememberMe');
                    }
                })
                .then((data) => {
                    if (data) {
                        this.setState({
                            userEmail: data.email,
                            isAdmin: data.isAdmin,
                            isModerator: data.isModerator,
                        });
                        sessionStorage.setItem('userId', data.userId);
                        sessionStorage.setItem('token', data.token);
                        sessionStorage.setItem('rememberMe', 'checked');
                    }
                })
                .catch(err => console.log(err))
        }
    }

    render() {
        return (
            <BrowserRouter>
                <Fragment>
                    <Header
                        user={{
                            email: this.state.userEmail,
                            isAdmin: this.state.isAdmin,
                            isModerator: this.state.isModerator
                        }}
                        logout={this.logout}
                        toggleMainGridSize={this.toggleMainGridSize}/>
                    <Grid container>
                        <Grid item xs={12} className={this.state.sideBarOpened ? "padding-left-20" : "padding-left-0"}>
                            <main>
                                <Switch>
                                    <Route exact path="/" render={() => <Home/>}/>
                                    <Route path="/flavours/all" render={() =>
                                        <ViewAllPage user={this.state.userEmail}
                                                     isAdmin={(this.state.isAdmin || this.state.isModerator)}
                                        />
                                    }/>
                                    <Route path="/flavour/details/" render={() =>
                                        <DetailsPage openSnack={this.handleSnackOpen}/>
                                    }/>
                                    {
                                        (this.state.isAdmin || this.state.isModerator)
                                            ? <Route path="/flavour/add" render={() =>
                                                <DynamicAddPage formType={"flavour"}
                                                                openSnack={this.handleSnackOpen}/>
                                            }/>
                                            : null
                                    }
                                    {
                                        this.state.userEmail !== null
                                            ? <Redirect to="/"/>
                                            : null
                                    }
                                    <Route path="/register" render={() =>
                                        <DynamicUserForm registerForm={true} loginUser={this.loginUser}
                                                         openSnack={this.handleSnackOpen}/>}
                                    />
                                    < Route path="/login" render={() =>
                                        <DynamicUserForm registerForm={false} loginUser={this.loginUser}
                                                         openSnack={this.handleSnackOpen}/>}
                                    />
                                    <Redirect to="/"/>
                                </Switch>

                                <SnackbarWrapper handleSnackClose={this.handleSnackClose}
                                                 snackOpened={this.state.snackOpened}
                                                 snackMessage={this.state.snackMessage}
                                                 snackType={this.state.snackType}/>
                            </main>
                        </Grid>
                    </Grid>
                </Fragment>
            </BrowserRouter>
        );
    }
}

export default App;
