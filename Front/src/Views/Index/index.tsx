import React from "react";

import withRoot from "../../Styles/WithRoot";
import { Route, Redirect, Switch } from "react-router-dom";
import { RouteComponentProps, withRouter } from "react-router";

import List from "../../Views/List";
import Bar from "../../Containers/Bar";

class Index extends React.PureComponent<RouteComponentProps> {
    render() {
        return (
            <>
                <Bar />
                <Switch>
                    <Redirect exact from="/" to="/list/1" />
                    <Route path="/list/:page" component={List} />
                    <Route path="/blog/:id" />
                    <Route path="/create" />
                    <Route path="/user" />
                </Switch>
            </>
        );
    }
}

export default withRouter(withRoot(Index));
