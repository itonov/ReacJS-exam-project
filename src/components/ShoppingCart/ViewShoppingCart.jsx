import React, {Component} from 'react';
import {Paper, Table, TableHead, TableRow, TableCell, TableBody} from '@material-ui/core';
import {DeleteForeverTwoTone} from "@material-ui/icons";
import './ViewShoppingCart.css';
import IconButton from "@material-ui/core/es/IconButton/IconButton";

class ViewShoppingCart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: null,
        };

        this.handleDeleteOrder = this.handleDeleteOrder.bind(this);
    }

    handleDeleteOrder(event, orderId) {
        event.preventDefault();
        fetch(`http://localhost:9999/feed/order/delete/${orderId}`, {
            headers: {
                'Authorization': sessionStorage.getItem('token'),
            }
        })
            .then((resp) => {
                if (resp.status === 200) {
                    this.props.openSnack('success', 'Item has been removed.');
                    this.componentDidMount();
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }

    componentDidMount() {
        fetch(`http://localhost:9999/feed/orders/all`, {
            headers: {
                'Authorization': sessionStorage.getItem('token'),
            }
        })
            .then((resp) => {
                if (resp.status === 200) {
                    return resp.json();
                }
            })
            .then((data) => {
                if (data) {
                    this.setState({
                        data: data.orders,
                    });
                }
            })
            .catch((err) => console.log(err));
    }

    render() {
        return (
            <Paper className={"margin-20px"}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell/>
                            <TableCell>Item Name</TableCell>
                            <TableCell align="right">Price</TableCell>
                            <TableCell align="right">Quantity</TableCell>
                            <TableCell align="right">Total Price</TableCell>
                            <TableCell/>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            this.state.data ? this.state.data.map((order, orderIndex) => (
                                    <TableRow key={orderIndex}>
                                        <TableCell>
                                            <img
                                                className={"preview-picture"}
                                                src={order.flavour.firstPictureLocation}
                                                alt={order.flavour.firstPictureLocation}
                                            />
                                        </TableCell>
                                        <TableCell component="th" scope="row">
                                            {order.flavour.name}
                                        </TableCell>
                                        <TableCell align="right">{order.flavour.price}</TableCell>
                                        <TableCell align="right">{order.quantity}</TableCell>
                                        <TableCell align="right">{order.flavour.price * order.quantity}</TableCell>
                                        <TableCell align="right">
                                            <IconButton onClick={(event) => this.handleDeleteOrder(event, order.id)}>
                                                <DeleteForeverTwoTone/>
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))
                                : null
                        }
                    </TableBody>
                </Table>
            </Paper>
        );
    }
}

export default ViewShoppingCart;