import React, {Component} from 'react';
import {Grid, GridList} from "@material-ui/core";
import FlavourService from "../../../services/flavour/flavourService";

class DetailsPage extends Component {
    constructor(props) {
        super(props);
        const flavourId = window.location.href.split('/').reverse()[0];
        this.state = {
            flavourId,
            flavour: null,
        };
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
                        this.setState({flavour: data.flavour});
                    }
                });
        }
    }

    render() {
        return (
            <Grid container spacing={24}>
                <h3>details</h3>
                <Grid item xs={6}>
                    {/*<GridList>*/}
                    {/*{tileData.map(tile => (*/}
                    {/*<GridListTile key={tile.img}>*/}
                    {/*<img src={tile.img} alt={tile.title}/>*/}
                    {/*<GridListTileBar*/}
                    {/*title={tile.title}*/}
                    {/*classes={{*/}
                    {/*root: classes.titleBar,*/}
                    {/*title: classes.title,*/}
                    {/*}}*/}
                    {/*actionIcon={*/}
                    {/*<IconButton>*/}
                    {/*<StarBorderIcon className={classes.title}/>*/}
                    {/*</IconButton>*/}
                    {/*}*/}
                    {/*/>*/}
                    {/*</GridListTile>*/}
                    {/*))}*/}
                    {/*</GridList>*/}
                </Grid>
                <Grid item xs={6}>

                </Grid>
            </Grid>
        );
    }
}

export default DetailsPage;