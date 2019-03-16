import React, {Component} from "react";
import Paper from "@material-ui/core/es/Paper/Paper";
import Typography from "@material-ui/core/es/Typography/Typography";

class Home extends Component {
    render() {
        return (
            <Paper className={"margin-20px"}>
                <Typography variant={"h2"}>
                    {
                        this.props.user
                            ? `Welcome, ${this.props.user.email}`
                            : 'Welcome, guest!'
                    }
                </Typography>
            </Paper>

        );
    }
}

export default Home;