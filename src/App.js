import React, {Component, Fragment} from 'react';
import {BrowserRouter, Redirect, Route, Switch} from 'react-router-dom';
import Grid from "@material-ui/core/Grid";
import './App.css';
import DynamicUserForm from './components/DynamicUserForm/DynamicUserForm';
import SnackbarWrapper from './components/SnackbarWrapper/SnackbarWrapper';
import Home from './components/Home/Home';
import Header from './components/Header/Header';
import DynamicAddForm from "./components/DynamicAddForm/DynamicAddForm";

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
            mainGridSize: 12,
        };

        this.loginUser = this.loginUser.bind(this);
        this.logout = this.logout.bind(this);
        this.handleSnackClose = this.handleSnackClose.bind(this);
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
                    console.log(data)
                    this.setState({
                        snackOpened: true,
                        snackType: 'error',
                        snackMessage: 'Login failed!',
                    });
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
                }
            })
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
    }

    handleSnackClose() {
        this.setState({snackOpened: false});
    }

    toggleMainGridSize() {
        if (this.state.mainGridSize === 9) {
            this.setState({mainGridSize: 12});
        } else {
            this.setState({mainGridSize: 9});
        }
    }

    render() {
        return (
            <BrowserRouter>
                <Fragment>
                    <Header user={this.state.userEmail} logout={this.logout}
                            toggleMainGridSize={this.toggleMainGridSize}/>
                    <Grid container>
                        <Grid item xs={this.state.mainGridSize === 9 ? 3 : false}/>
                        <Grid item xs={this.state.mainGridSize}>
                            <main>
                                <Switch>
                                    <Route exact path="/" render={() => <Home/>}/>
                                    {
                                        (this.state.isAdmin || this.state.isModerator)
                                            ? <Route path="/add/flavour" render={() =>
                                                <DynamicAddForm formType={"flavour"}/>
                                            }/>
                                            : null}
                                    {
                                        this.state.userEmail !== null
                                            ? <Redirect to="/"/>
                                            : null
                                    }
                                    <Route path="/register" render={() =>
                                        <DynamicUserForm registerForm={true} loginUser={this.loginUser}/>}
                                    />
                                    < Route path="/login" render={() =>
                                        <DynamicUserForm registerForm={false} loginUser={this.loginUser}/>}
                                    />
                                    <Redirect to="/"/>
                                </Switch>

                                <SnackbarWrapper handleSnackClose={this.handleSnackClose}
                                                 snackOpened={this.state.snackOpened}
                                                 snackMessage={this.state.snackMessage}
                                                 snackType={this.state.snackType}/>
                            </main>
                        </Grid></Grid>
                </Fragment>
            </BrowserRouter>
        );
    }
}

export default App;
