import React from "react";
import classnames from "classnames";
import { RouteComponentProps } from "react-router";

import { withStyles, WithStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Create from "@material-ui/icons/Create";
import Settings from "@material-ui/icons/Settings";

import styles from "../../Styles/Bar";
import { UserGetInfo } from "../../Actions";

interface Props extends WithStyles {
    getUserInfo: (id: string) => UserGetInfo;
}

class Bar extends React.PureComponent<Props & RouteComponentProps> {
    handleCreateClick = () => {
        this.props.getUserInfo("Faraway");
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

export default withStyles(styles)(Bar);
