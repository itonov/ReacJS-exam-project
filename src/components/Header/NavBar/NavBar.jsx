import {AppBar, IconButton, Toolbar, Typography} from "@material-ui/core";
import React, {Component, Fragment} from "react";
import {NavLink} from "react-router-dom";
import MenuIcon from '@material-ui/icons/Menu';
import Button from "@material-ui/core/Button";

class NavBar extends Component {
    render() {
        return (
            <AppBar position={"sticky"}>
                <Toolbar>
                    <IconButton color="inherit" aria-label="Open drawer" onClick={this.props.toggleSidebar}>
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h6" color="inherit" noWrap style={{flex: 1}}>
                        <NavLink to="/">
                            Material-UI
                        </NavLink>
                    </Typography>
                    {
                        this.props.user.email !== null
                            ? <Button color="default" onClick={(event) => {
                                event.preventDefault();
                                this.props.logout();
                            }
                            }>Logout</Button>
                            : <Fragment>
                                <NavLink to="/register">
                                    <Button color="default">Register</Button>
                                </NavLink>
                                <NavLink to="/login">
                                    <Button color="default">Login</Button>
                                </NavLink>
                            </Fragment>
                    }
                </Toolbar>
            </AppBar>
        )
    }
}

export default NavBar;