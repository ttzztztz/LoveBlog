import React from "react";
import classnames from "classnames";
import { RouteComponentProps, withRouter } from "react-router";

import { withStyles, WithStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Create from "@material-ui/icons/Create";
import Settings from "@material-ui/icons/Settings";

import styles from "../../Styles/Bar";

class Bar extends React.PureComponent<WithStyles & RouteComponentProps> {
    handleCreateClick = () => {
        this.props.history.push({
            pathname: "/create"
        });
    };
    handleUserClick = () => {
        this.props.history.push({
            pathname: "/user"
        });
    };
    render() {
        const { classes } = this.props;
        return (
            <AppBar position="static">
                <Toolbar>
                    <Typography
                        variant="h6"
                        color="inherit"
                        className={classnames(classes["love-head"], classes["head-1"])}
                    >
                        Love Blog
                    </Typography>
                    <Typography
                        variant="h6"
                        color="inherit"
                        className={classnames(classes["love-head"], classes["head-2"])}
                    >
                        <IconButton aria-haspopup="true" color="inherit" onClick={this.handleCreateClick}>
                            <Create />
                        </IconButton>
                        <IconButton aria-haspopup="true" color="inherit" onClick={this.handleUserClick}>
                            <Settings />
                        </IconButton>
                    </Typography>
                </Toolbar>
            </AppBar>
        );
    }
}

export default withStyles(styles)(withRouter(Bar));
