import React, {Component} from "react";
import {IconButton, Snackbar} from "@material-ui/core";
import {Close as CloseIcon} from "@material-ui/icons";
import './SnackbarWrapper.css';
import SnackbarContent from "@material-ui/core/es/SnackbarContent/SnackbarContent";

class SnackbarWrapper extends Component {
    render() {
        return (
            <Snackbar
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right'
                }}
                open={this.props.snackOpened}
                autoHideDuration={5000}
                onClose={this.props.handleSnackClose}
            >
                <SnackbarContent
                    style={
                        this.props.snackType === 'error'
                            ? {backgroundColor: 'red'}
                            : this.props.snackType === 'success'
                            ? {backgroundColor: 'green'}
                            : ''
                    }
                    aria-describedby="client-snackbar"
                    action={[
                        <IconButton
                            key="close"
                            aria-label="Close"
                            color="inherit"
                            onClick={this.props.handleSnackClose}
                        >
                            <CloseIcon/>
                        </IconButton>,
                    ]}
                    message={<span id="client-snackbar">{this.props.snackMessage}</span>}
                />
            </Snackbar>
        );
    }
}

export default SnackbarWrapper;