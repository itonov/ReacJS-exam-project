import React, {Component} from "react";
import {Grid, TextField, Typography, RadioGroup, FormControlLabel, Radio, Button} from "@material-ui/core";
import FlavourService from "../../../services/flavour/flavourService";
import InputLabel from "@material-ui/core/es/InputLabel/InputLabel";

class AddFlavourPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: null,
            price: null,
            description: null,
            availability: null,
            quantity: 0,
            firstPicture: null,
            secondPicture: null,

        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        if (event.target.files) {
            this.setState({
                [event.target.name]: event.target.files[0]
            });
        } else {
            this.setState({
                [event.target.name]: event.target.value,
            });
        }
        if (this.state.availability !== 'In Stock') {
            this.setState({
                quantity: 0
            });
        }
    }

    handleSubmit(event) {
        event.preventDefault();
        FlavourService.addNewFlavour(this.state)
            .then(response => {
                if (response.ok) {
                    return response.json()
                }
                console.log(response)
                this.props.openSnack('error', 'Adding flavour failed!')
            })
            .then(body => {
                if (body) {
                    this.props.openSnack('success', `${body.flavour.name} added successfully!`);
                }
            });
    }

    render() {
        return (
            <div className="Login">
                <Typography variant="h4" gutterBottom>
                    Add new flavour
                </Typography>
                <Grid container spacing={8} alignItems="flex-end">
                    <form noValidate autoComplete="off" onSubmit={this.handleSubmit}>
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
                        {
                            this.state.availability === 'In Stock'
                                ?
                                <Grid item>
                                    <TextField
                                        margin={"normal"}
                                        label="Quantity"
                                        name="quantity"
                                        type="number"
                                        onChange={this.handleChange}
                                    />
                                </Grid>
                                : null
                        }
                        <Grid item>
                            <RadioGroup
                                label="Availability"
                                name="availability"
                                onChange={this.handleChange}
                            >
                                <FormControlLabel value="In Stock" control={<Radio/>} label="In Stock"/>
                                <FormControlLabel value="External Order" control={<Radio/>} label="External Order"/>
                                <FormControlLabel value="Unavailable" control={<Radio/>} label="Unavailable"/>
                            </RadioGroup>
                        </Grid>
                        <Grid item>
                            <InputLabel>First picture:</InputLabel>
                            <Button variant={"contained"}>
                                <input type="file" accept="image/*" name="firstPicture" onChange={this.handleChange}/>
                            </Button>
                        </Grid>
                        <Grid item>
                            <InputLabel>Second picture:</InputLabel>
                            <Button variant={"contained"}>
                                <input type="file" accept="image/*" name="secondPicture" onChange={this.handleChange}/>
                            </Button>
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

export default AddFlavourPage;