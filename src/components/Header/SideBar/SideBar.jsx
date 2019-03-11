import React, {Component} from "react";
import {Drawer, List, ListItem, ListItemIcon, ListItemText, Divider, Collapse} from "@material-ui/core";
import {
    AddCircleTwoTone,
    ChevronLeftTwoTone,
    ExpandLess,
    ExpandMore,
    HomeTwoTone,
    StoreTwoTone
} from "@material-ui/icons";
import {NavLink} from "react-router-dom";
import './SideBar.css';

class SideBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            flavourCollapseOpen: false,
        };

        this.toggleFlavourCollapse = this.toggleFlavourCollapse.bind(this);
    }

    toggleFlavourCollapse() {
        this.setState({
            flavourCollapseOpen: !this.state.flavourCollapseOpen,
        });
    }

    render() {
        const {open, onClose} = this.props;
        return (
            <Drawer
                variant="persistent"
                open={open}
                onClose={onClose}
            >
                <List component="nav">
                    <ListItem button onClick={onClose}>
                        <ListItemIcon className={"align-right-custom"}><ChevronLeftTwoTone/></ListItemIcon>
                    </ListItem>
                    <Divider/>
                    <NavLink to={"/"}>
                        <ListItem button key={"Home"}>
                            <ListItemIcon><HomeTwoTone/></ListItemIcon>
                            <ListItemText primary={"Home"}/>
                        </ListItem>
                    </NavLink>

                    <ListItem button key={"Flavours"} onClick={this.toggleFlavourCollapse}>
                        <ListItemIcon>
                            <StoreTwoTone/>
                        </ListItemIcon>
                        <ListItemText inset primary="Flavours"/>
                        {this.state.flavourCollapseOpen ? <ExpandLess/> : <ExpandMore/>}
                    </ListItem>
                    <Collapse in={this.state.flavourCollapseOpen} timeout="auto" unmountOnExit
                              classes={{container: "margin-left-20px"}}
                    >
                        <List component="div">
                            <NavLink to={"/view/flavour"}>
                                <ListItem button key={"ViewFlavours"}>
                                    <ListItemIcon><StoreTwoTone/></ListItemIcon>
                                    <ListItemText primary={"View Flavours"}/>
                                </ListItem>
                            </NavLink>
                            <NavLink to={"/add/flavour"}>
                                <ListItem button key={"AddFlavours"}>
                                    <ListItemIcon><AddCircleTwoTone/></ListItemIcon>
                                    <ListItemText primary={"Add Flavour"}/>
                                </ListItem>
                            </NavLink>
                        </List>
                    </Collapse>
                </List>
                <List>
                    {/*{['All mail', 'Trash', 'Spam'].map((text, index) => (*/}
                    {/*<ListItem button key={text}>*/}
                    {/*<ListItemIcon>{index % 2 === 0 ? <InboxIcon/> : <MailIcon/>}</ListItemIcon>*/}
                    {/*<ListItemText primary={text}/>*/}
                    {/*</ListItem>*/}
                    {/*))}*/}
                </List>
            </Drawer>
        )
    }
}

export default SideBar;