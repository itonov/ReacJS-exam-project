import React, {Component} from 'react';
import {Grid, IconButton, InputAdornment, Typography, TextField, Button} from '@material-ui/core';
import './Register.css';
import {AlternateEmailTwoTone, LockTwoTone, Visibility, VisibilityOff} from "@material-ui/icons";

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: null,
            password: null,
            confirmPassword: null,
            showPassword: false,
            showConfirmPassword: false,
        };

        this.handleClickShowPassword = this.handleClickShowPassword.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleClickShowConfirmPassword = this.handleClickShowConfirmPassword.bind(this);
    }

    handleClickShowPassword() {
        this.setState({
            showPassword: !this.state.showPassword
        });
    }

    handleClickShowConfirmPassword() {
        this.setState({
            showConfirmPassword: !this.state.showConfirmPassword
        });
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value,
        });
    }

    render() {
        const {emailRegex} = this.props;

        return (
            <div className="Register">
                <Typography variant="h4" gutterBottom>
                    Register
                </Typography>
                <form onSubmit={(event) => {
                    event.preventDefault();
                    this.props.handleSubmit(this.state)
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
                                type="email"
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
                                    "error": (
                                        this.state.password !== null && this.state.password.length < 5
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
                                id="outlined-adornment-confirm-password"
                                type={this.state.showConfirmPassword ? 'text' : 'password'}
                                label="Confirm Password"
                                autoComplete='off'
                                name="confirmPassword"

                                onChange={this.handleChange}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="Toggle password visibility"
                                                onClick={this.handleClickShowConfirmPassword}
                                            >
                                                {this.state.showConfirmPassword ? <VisibilityOff/> :
                                                    <Visibility/>}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                    "error": (
                                        this.state.confirmPassword !== null
                                        && this.state.password !== this.state.confirmPassword
                                    ),
                                }}
                            />
                        </Grid>
                    </Grid>
                    <Button variant="contained" color="primary" type="submit">
                        Register
                    </Button>
                </form>
                <
                /div>
                )
                ;
                }
                }

                export default Register;