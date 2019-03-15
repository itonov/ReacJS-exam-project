import React, {Component} from "react";
import {Grid} from "@material-ui/core";
import AddFlavourPage from "./AddFlavourPage/AddFlavourPage";

class DynamicAddPage extends Component {
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
                            ? <AddFlavourPage openSnack={this.props.openSnack}/>
                            : null
                        }
                    </Grid>
                </Grid>
            </Grid>
        )
    }
}

export default DynamicAddPage;