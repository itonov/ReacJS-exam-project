import React, {Component} from "react";
import Grid from "@material-ui/core/Grid";
import NavBar from "./NavBar/NavBar";
import SideBar from "./SideBar/SideBar";

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            openSidebar: false
        };
        this.toggleSidebar = this.toggleSidebar.bind(this);
    }

    toggleSidebar() {
        this.setState({openSidebar: !this.state.openSidebar});
        this.props.toggleMainGridSize();
    }

    render() {
        return (
            <header>
                <SideBar open={this.state.openSidebar} onClose={this.toggleSidebar} user={this.props.user}/>
                <Grid container>
                    <Grid item
                          xs={12}
                          className={this.state.openSidebar ? "padding-left-20" : "padding-left-0"}>
                    <NavBar
                        user={this.props.user} logout={this.props.logout}
                        toggleSidebar={this.toggleSidebar}/>
                </Grid>
            </Grid>
    </header>
    )
    }
}

export default Header;