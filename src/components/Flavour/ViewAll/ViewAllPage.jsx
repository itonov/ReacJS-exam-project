import React, {Component, Fragment} from 'react';
import {
    Grid,
    CardActions,
    Typography,
    Collapse,
    CardContent,
    IconButton,
    CardMedia,
    Card,
    CardHeader
} from '@material-ui/core';
import './ViewAllPage.css';
import {
    Delete as DeleteIcon,
    ExpandMore as ExpandMoreIcon,
    Share as ShareIcon,
    ExpandLess as ExpandLessIcon,
} from "@material-ui/icons";
import FlavourService from "../../../services/flavour/flavourService";
import Button from "@material-ui/core/es/Button/Button";

class ViewAllPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: null,
        };

        this.handleExpandClick = this.handleExpandClick.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    handleExpandClick(event, itemIndex) {
        event.preventDefault();
        const newData = this.state.data.map((item, index) => {
            if (index === itemIndex) {
                item.expanded = !item.expanded;
            }
            return item;
        });

        this.setState({
            data: newData,
        });
    }

    handleDelete(event, flavourId) {
        event.preventDefault();
        FlavourService.deleteFlavour(flavourId)
            .then((resp) => {
                console.log(resp);
                if (resp.status === 200) {
                    this.componentDidMount();
                }
            })
            .catch(err => console.log(err));
    }

    componentDidMount() {
        // in case this becomes dynamic view all page
        // const {dataType} = this.props;
        FlavourService.receiveAllFlavours()
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                console.log(response);
            })
            .then(async (data) => {
                if (data) {
                    this.setState({
                        data: data.flavours
                    });
                }
            });
    }

    render() {
        return (
            <Fragment>
                <Grid container spacing={0} justify="center"
                      alignItems="center">
                    <h1>all flavours</h1>
                    <Grid container className="data-container" spacing={16} justify="center">
                        {
                            this.state.data !== null
                                ? this.state.data.map((flavour, itemIndex) => {
                                    return (
                                        <Grid key={flavour.name + itemIndex} item xs={4}>
                                            <Card>
                                                <CardHeader
                                                    // avatar={
                                                    //     <Avatar aria-label="Recipe"
                                                    //     >
                                                    //         R
                                                    //     </Avatar>
                                                    // }
                                                    action={
                                                        <Button href={"/flavour/details/" + flavour._id} color={"primary"}>
                                                            Details
                                                        </Button>
                                                    }
                                                    title={flavour.name}
                                                    subheader={"Price: " + flavour.price}
                                                />
                                                <CardMedia
                                                    className={"media"}
                                                    image={flavour.firstPictureLocation}
                                                >
                                                </CardMedia>
                                                <CardContent>
                                                    <Typography>
                                                        {flavour.availability}
                                                    </Typography>
                                                </CardContent>
                                                <CardActions
                                                    disableActionSpacing>
                                                    {
                                                        (this.props.user && this.props.isAdmin)
                                                            ?
                                                            <IconButton aria-label="Remove"
                                                                        onClick={(event) => this.handleDelete(event, flavour._id)}>
                                                                <DeleteIcon/>
                                                            </IconButton>
                                                            :
                                                            null
                                                    }
                                                    <IconButton aria-label="Share">
                                                        <ShareIcon/>
                                                    </IconButton>
                                                    <IconButton
                                                        onClick={(event) => this.handleExpandClick(event, itemIndex)}
                                                        aria-expanded={flavour.expanded}
                                                        aria-label="Show more"
                                                    >
                                                        {
                                                            flavour.expanded
                                                                ? <ExpandLessIcon/>
                                                                : <ExpandMoreIcon/>
                                                        }

                                                    </IconButton>
                                                </CardActions>
                                                <Collapse in={flavour.expanded} timeout="auto" unmountOnExit>
                                                    <CardContent>
                                                        <Typography paragraph>Description:</Typography>
                                                        <Typography paragraph>
                                                            {flavour.description}
                                                        </Typography>
                                                        <Typography paragraph>
                                                            Heat oil in a (14- to 16-inch) paella pan or a large, deep
                                                            skillet over medium-high
                                                            heat. Add chicken, shrimp and chorizo, and cook, stirring
                                                            occasionally until lightly
                                                            browned, 6 to 8 minutes. Transfer shrimp to a large plate
                                                            and
                                                            set aside, leaving
                                                            chicken and chorizo in the pan. Add pimentón, bay leaves,
                                                            garlic, tomatoes, onion,
                                                            salt and pepper, and cook, stirring often until thickened
                                                            and
                                                            fragrant, about 10
                                                            minutes. Add saffron broth and remaining 4 1/2 cups chicken
                                                            broth; bring to a boil.
                                                        </Typography>
                                                        <Typography paragraph>
                                                            Add rice and stir very gently to distribute. Top with
                                                            artichokes
                                                            and peppers, and cook
                                                            without stirring, until most of the liquid is absorbed, 15
                                                            to 18
                                                            minutes. Reduce heat
                                                            to medium-low, add reserved shrimp and mussels, tucking them
                                                            down into the rice, and
                                                            cook again without stirring, until mussels have opened and
                                                            rice
                                                            is just tender, 5 to 7
                                                            minutes more. (Discard any mussels that don’t open.)
                                                        </Typography>
                                                        <Typography>
                                                            Set aside off of the heat to let rest for 10 minutes, and
                                                            then
                                                            serve.
                                                        </Typography>
                                                    </CardContent>
                                                </Collapse>
                                            </Card>
                                        </Grid>
                                    );
                                })
                                : null
                        }
                    </Grid>
                </Grid>
            </Fragment>
        )
    }
}

export default ViewAllPage;