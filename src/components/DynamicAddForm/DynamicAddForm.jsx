import React, {Component} from "react";
import {Grid} from "@material-ui/core";
import AddFlavourForm from "./AddFlavourForm/AddFlavourForm";
import SnackbarWrapper from "../SnackbarWrapper/SnackbarWrapper";

class DynamicAddForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            snackOpened: false,
            snackType: null,
            snackMessage: null
        };

        this.handleSnackClose = this.handleSnackClose.bind(this);
    }

    handleSnackClose() {
        this.setState({snackOpened: !this.state.snackOpened})
    }

    render() {
        const {formType} = this.props;
        return (
            <Grid
                container
                spacing={0}
                justify="center"
            >
                <Grid container spacing={0} justify="center">
                    <Grid item xs={10}>
                        {formType === 'flavour'
                            ? <AddFlavourForm/>
                            : null
                        }
                    </Grid>
                </Grid>
                <SnackbarWrapper handleSnackClose={this.handleSnackClose} snackOpened={this.state.snackOpened}
                                 snackMessage={this.state.snackMessage} snackType={this.state.snackType}/>
            </Grid>
        )
    }
}

export default DynamicAddForm;