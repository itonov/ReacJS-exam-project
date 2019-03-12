import React, {Component} from "react";
import Register from "./Register/Register";
import Login from "./Login/Login";
import {Grid} from "@material-ui/core";
import SnackbarWrapper from "../SnackbarWrapper/SnackbarWrapper";

const emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

class DynamicUserForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            snackOpened: false,
            snackMessage: null,
            snackType: null
        };

        this.registerUser = this.registerUser.bind(this);
        this.handleSnackClose = this.handleSnackClose.bind(this);
    }

    handleSnackClose() {
        this.setState({snackOpened: !this.state.snackOpened})
    }

    registerUser(data) {
        fetch('http://localhost:9999/auth/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(response => response.json())
            .then(body => {
                console.log(body);
                if (body.errors) {
                    this.props.openSnack('error', 'Registration failed!');
                } else {
                    // this.setState({
                    //     snackOpened: true,
                    //     snackType: "success",
                    //     snackMessage: this.props.registerForm ? body.message : 'Login successful!'
                    // });
                    this.props.loginUser({email: data.email, password: data.password});
                }
            });
    }

    render() {
        return (
            <Grid
                container
                spacing={0}
                justify="center"
            >
                <Grid container spacing={0} justify="center">
                    <Grid item xs={10}>
                        {
                            this.props.registerForm
                                ? (<Register handleSubmit={this.registerUser} emailRegex={emailRegex}/>)
                                : (<Login loginUser={this.props.loginUser.bind(this)} emailRegex={emailRegex}/>)
                        }
                    </Grid>
                </Grid>
                <SnackbarWrapper handleSnackClose={this.handleSnackClose} snackOpened={this.state.snackOpened}
                                 snackMessage={this.state.snackMessage} snackType={this.state.snackType}/>
            </Grid>
        )
    }
}

export default DynamicUserForm;