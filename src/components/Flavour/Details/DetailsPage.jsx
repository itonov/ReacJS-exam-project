import React, {Component, Fragment} from 'react';
import {
    Grid,
    GridList,
    GridListTile,
    CardActions,
    Typography,
    CardContent,
    CardHeader,
    Card,
    IconButton,
    Input,
} from '@material-ui/core';
import {AddShoppingCartTwoTone} from "@material-ui/icons";
import FlavourService from '../../../services/flavour/flavourService';
import './DetailsPage.css';

class DetailsPage extends Component {
    constructor(props) {
        super(props);
        const flavourId = window.location.href.split('/').reverse()[0];
        this.state = {
            flavourId: flavourId,
            selectedPictureLocation: null,
            quantityToBuy: 1,
            flavour: {
                name: null,
            },
        };

        this.changeSelectedPic = this.changeSelectedPic.bind(this);
        this.handleQuantityChange = this.handleQuantityChange.bind(this);
        this.handleSubmitOrder = this.handleSubmitOrder.bind(this);
    }

    changeSelectedPic(event) {
        event.preventDefault();
        this.setState({
            selectedPictureLocation: this.state.flavour[event.target.name]
        });
    }

    handleQuantityChange(event) {
        const inputQuantity = event.target.value;
        this.setState({
            quantityToBuy: inputQuantity > this.state.flavour.quantity ? this.state.flavour.quantity : inputQuantity,
        });
    }

    handleSubmitOrder() {
        const orderData = {
            userEmail: this.props.user.email,
            flavourId: this.state.flavourId,
            quantity: this.state.quantityToBuy,
            itemType: 'flavour',
        };

        fetch('http://localhost:9999/feed/order/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': sessionStorage.getItem('token'),
            },
            body: JSON.stringify(orderData)
        })
            .then((resp) => {
                console.log(resp)
                if (resp.status === 201) {
                    this.props.openSnack('success', 'Item added to shopping cart!');
                } else if (resp.status === 401) {
                    this.props.sessionEnd();
                } else {
                    this.props.openSnack('error', 'Failed to add item!');
                }
            })
            .catch((err) => {
                console.log(err)
                this.props.openSnack('error', 'Failed to add item!');
            });
    }

    componentDidMount() {
        if (this.state.flavourId) {
            FlavourService.findFlavour(this.state.flavourId)
                .then((resp) => {
                    if (resp.status === 200) {
                        return resp.json();
                    } else {
                        this.props.openSnack('error', 'Cannot find flavour.');
                    }
                })
                .then((data) => {
                    if (data) {
                        this.setState({
                            selectedPictureLocation: data.flavour.firstPictureLocation,
                            flavour: data.flavour
                        });
                        console.log(data)
                    }
                });
        }
    }

    render() {
        return (
            <Grid container>
                <Grid item xs={6}>
                    <Card raised className={"margin-20px"}>
                        <img
                            className={"selected-picture"}
                            src={this.state.selectedPictureLocation}
                            alt={this.state.selectedPictureLocation}
                        />
                    </Card>
                    <Card raised className={"margin-20px"}>
                        <GridList cols={2} spacing={10} className={"image-list"}>
                            <GridListTile
                                key={this.state.flavour.firstPictureLocation}>
                                <img src={this.state.flavour.firstPictureLocation}
                                     alt={this.state.flavour.firstPictureLocation}
                                     name="firstPictureLocation"
                                     className={"selected-picture"}
                                     onClick={this.changeSelectedPic}
                                />
                            </GridListTile>
                            <GridListTile
                                key={this.state.flavour.secondPictureLocation}>
                                <img src={this.state.flavour.secondPictureLocation}
                                     alt={this.state.flavour.secondPictureLocation}
                                     name="secondPictureLocation"
                                     className={"selected-picture"}
                                     onClick={this.changeSelectedPic}
                                />
                            </GridListTile>
                        </GridList>
                    </Card>
                </Grid>
                <Grid item xs={6}>
                    <Card raised className={"margin-20px"}>
                        <CardHeader
                            title={this.state.flavour.name}
                        />
                        <CardContent>
                            {
                                this.state.flavour.availability === 'In Stock'
                                    ? <Typography variant="subtitle2" gutterBottom>
                                        Price: {this.state.flavour.price}
                                    </Typography>
                                    : null
                            }
                            <Typography variant="subtitle2" gutterBottom>
                                {this.state.flavour.availability}
                            </Typography>
                        </CardContent>
                        <CardActions disableActionSpacing>
                            {
                                this.props.user.email
                                    ? <Fragment>
                                        <Input type="number"
                                               value={this.state.quantityToBuy}
                                               inputProps={{min: 1, max: this.state.flavour.quantity}}
                                               onChange={this.handleQuantityChange}
                                        />
                                        <IconButton
                                            aria-label="Add to shopping cart"
                                            onClick={this.handleSubmitOrder}>
                                            <AddShoppingCartTwoTone/>
                                        </IconButton>
                                    </Fragment>
                                    : null
                            }
                        </CardActions>

                    </Card>
                    <Card raised className={"margin-20px"}>
                        <Typography variant="h6" gutterBottom className={"text-area-around"}>
                            Description:
                        </Typography>
                        <Typography variant="subtitle2" gutterBottom className={"text-area-around"}>
                            {this.state.flavour.description}
                        </Typography>
                    </Card>
                </Grid>
            </Grid>
        );
    }
}

export default DetailsPage;