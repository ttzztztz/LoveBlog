import React from "react";
import withRoot from "../../Styles/WithRoot";
import { withRouter } from "react-router-dom";

import Bar from "../../Components/Bar";

class Index extends React.PureComponent {
    render() {
        return (
            <div>
                <Bar />
            </div>
        );
    }
}

export default withRouter(withRoot(Index));
