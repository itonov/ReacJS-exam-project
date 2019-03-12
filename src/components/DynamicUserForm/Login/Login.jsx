import React, {Component} from "react";
import './Login.css';
import {InputAdornment, IconButton, Grid, Typography, TextField, Button} from "@material-ui/core";
import {LockTwoTone, AlternateEmailTwoTone, Visibility, VisibilityOff} from '@material-ui/icons';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: null,
            password: null,
            showPassword: false,
        };

        this.handleClickShowPassword = this.handleClickShowPassword.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleClickShowPassword() {
        this.setState({
            showPassword: !this.state.showPassword
        });
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    render() {
        const {emailRegex} = this.props;

        return (
            <div className="Login">
                <Typography variant="h4" gutterBottom>
                    Login
                </Typography>
                <form onSubmit={(event) => {
                    event.preventDefault();
                    this.props.loginUser(this.state)
                }}>
                    <Grid container spacing={8} alignItems="flex-end" className="padding-15px">
                        <Grid item>
                            <AlternateEmailTwoTone/>
                        </Grid>
                        <Grid item>
                            <TextField
                                id="outlined-adornment-email"
                                label="Email"
                                name="email"
                                type="text"
                                onChange={this.handleChange}
                                InputProps={{
                                    "error": (
                                        this.state.email === null
                                            ? false
                                            : !emailRegex.test(this.state.email)
                                    ),
                                }}
                            />
                        </Grid>
                    </Grid>
                    <Grid container spacing={8} alignItems="flex-end" className="padding-15px">
                        <Grid item>
                            <LockTwoTone/>
                        </Grid>
                        <Grid item>
                            <TextField
                                id="outlined-adornment-password"
                                type={this.state.showPassword ? 'text' : 'password'}
                                label="Password"
                                autoComplete='off'
                                name="password"

                                onChange={this.handleChange}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="Toggle password visibility"
                                                onClick={this.handleClickShowPassword}
                                            >
                                                {this.state.showPassword ? <VisibilityOff/> : <Visibility/>}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </Grid>
                    </Grid>
                    <Button variant="contained" color="primary" type="submit">
                        Login
                    </Button>
                </form>
            </div>
        );
    }
}

export default Login;