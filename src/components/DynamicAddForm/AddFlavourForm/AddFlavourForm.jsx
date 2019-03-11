import React, {Component} from "react";
import {Grid, TextField, Typography, RadioGroup, FormControlLabel, Radio, Button} from "@material-ui/core";

class AddFlavourForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: null,
            price: null,
            description: null,
            availability: null,
            quantity: null,
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleAddFlavour = this.handleAddFlavour.bind(this);
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value,
        });
    }

    handleAddFlavour() {

    }

    render() {
        return (
            <div className="Login">
                <Typography variant="h4" gutterBottom>
                    Add new flavour
                </Typography>
                <Grid container spacing={8} alignItems="flex-end">
                    <form noValidate autoComplete="off" onSubmit={this.handleAddFlavour}>
                        <Grid item>
                            <TextField
                                margin={"normal"}
                                label="Name"
                                name="name"
                                type="text"
                                onChange={this.handleChange}
                                InputProps={{
                                    "error": (
                                        this.state.name === ''
                                    ),
                                }}
                            />
                        </Grid>
                        <Grid item>
                            <TextField
                                margin={"normal"}
                                label="Price"
                                name="price"
                                type="number"
                                onChange={this.handleChange}
                                InputProps={{
                                    "error": (
                                        this.state.price === ''
                                    ),
                                }}
                            />
                        </Grid>
                        <Grid item>
                            <TextField
                                label="Description"
                                name="description"
                                multiline={true}
                                rows={4}
                                rowsMax={8}
                                type="text"
                                onChange={this.handleChange}
                                margin={"normal"}
                            />
                        </Grid>
                        <Grid item>
                            <RadioGroup
                                label="Availability"
                                name="availability"
                                value={this.state.value}
                                onChange={this.handleChange}
                            >
                                <FormControlLabel value="In Stock" control={<Radio/>} label="In Stock"/>
                                {
                                    this.state.availability === 'In Stock'
                                        ?
                                        <TextField
                                            margin={"normal"}
                                            label="Quantity"
                                            name="quantity"
                                            type="number"
                                            onChange={this.handleChange}
                                        />
                                        : null
                                }
                                <FormControlLabel value="External Order" control={<Radio/>} label="External Order"/>
                                <FormControlLabel value="Unavailable" control={<Radio/>} label="Unavailable"/>
                            </RadioGroup>
                        </Grid>
                        <Button variant="contained" color="primary" type="submit">
                            Add flavour
                        </Button>
                    </form>
                </Grid>
            </div>
        )
    }
}

export default AddFlavourForm;