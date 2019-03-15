import React, {Component, Fragment} from "react";
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
                        <ListItemIcon className={"margin-left-auto"}><ChevronLeftTwoTone/></ListItemIcon>
                    </ListItem>
                    <Divider/>
                    <NavLink to={"/"}>
                        <ListItem button key={"Home"}>
                            <ListItemIcon><HomeTwoTone/></ListItemIcon>
                            <ListItemText primary={"Home"}/>
                        </ListItem>
                    </NavLink>
                    {
                        (this.props.user.isAdmin || this.props.user.isModerator)
                            ? <Fragment>
                                <ListItem button key={"Flavours"} onClick={this.toggleFlavourCollapse}>
                                    <ListItemIcon>
                                        <StoreTwoTone/>
                                    </ListItemIcon>
                                    <ListItemText inset primary="Flavours"/>
                                    {this.state.flavourCollapseOpen ? <ExpandLess/> : <ExpandMore/>}
                                </ListItem>
                                <Collapse in={this.state.flavourCollapseOpen} timeout="auto" unmountOnExit>
                                    <List component="div">
                                        <NavLink to={"/flavours/all"}>
                                            <ListItem button key={"AllFlavours"}>
                                                <ListItemIcon><StoreTwoTone/></ListItemIcon>
                                                <ListItemText primary={"All Flavours"}/>
                                            </ListItem>
                                        </NavLink>
                                        <NavLink to={"/flavour/add"}>
                                            <ListItem button key={"AddFlavours"}>
                                                <ListItemIcon><AddCircleTwoTone/></ListItemIcon>
                                                <ListItemText primary={"Add Flavour"}/>
                                            </ListItem>
                                        </NavLink>
                                    </List>
                                </Collapse>
                            </Fragment>
                            : <NavLink to={"/flavours/all"}>
                                <ListItem button key={"AllFlavours"}>
                                    <ListItemIcon><StoreTwoTone/></ListItemIcon>
                                    <ListItemText primary={"All Flavours"}/>
                                </ListItem>
                            </NavLink>
                    }
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