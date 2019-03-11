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
                <Grid container>
                    <Grid item xs={this.state.openSidebar ? 3 : false}>
                        <SideBar open={this.state.openSidebar} onClose={this.toggleSidebar}/>
                    </Grid>
                    <Grid item xs={this.state.openSidebar ? 9 : 12}>
                        <NavBar user={this.props.user} logout={this.props.logout} toggleSidebar={this.toggleSidebar}/>
                    </Grid>
                </Grid>
            </header>
        )
    }
}

export default Header;