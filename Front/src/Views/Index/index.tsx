import React from "react";
import withRoot from "../../Styles/WithRoot";
import { withRouter } from "react-router-dom";

import Client from "../../Models/ApolloClient";
import { GET_BLOG_LIST } from "../../Models/Query";

import Bar from "../../Components/Bar";

class Index extends React.PureComponent {
    render() {
        return (
            <div>
                <Bar />
            </div>
        );
    }
    async componentDidMount() {
        const result = await Client.query({
            query: GET_BLOG_LIST(1)
        });

        console.log(result);
    }
}

export default withRouter(withRoot(Index));
