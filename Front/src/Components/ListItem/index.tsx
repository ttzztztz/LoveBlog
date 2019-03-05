import React from "react";
import { RouteComponentProps } from "react-router";

import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { WithStyles, withStyles } from "@material-ui/core";

import styles from "../../Styles/ListItem";

interface IListItemProps {
    _id: string;
    title: string;
    authorName: string;
    createDate: Date;
}

class ListItem extends React.PureComponent<IListItemProps & WithStyles & RouteComponentProps> {
    handleClick = () => {
        const { _id } = this.props;
        this.props.history.push({
            pathname: `/blog/${_id}`
        });
    };
    render() {
        const { classes, title, authorName, createDate } = this.props;
        return (
            <Paper onClick={this.handleClick}>
                <Typography variant="h3" color="inherit" className={classes["item-head"]}>
                    {title}
                </Typography>
                <Typography variant="h6" color="inherit" className={classes["item-head"]}>
                    {authorName} {createDate.toLocaleString()}
                </Typography>
            </Paper>
        );
    }
}

export default withStyles(styles)(ListItem);
