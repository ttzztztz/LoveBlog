import { connect } from "react-redux";
import { Dispatch } from "redux";
import { withRouter } from "react-router";
import Bar from "../../Components/Bar";

import { userGetInfo } from "../../Actions";

const mapStateToProps = () => ({});

const mapDispatchToProps = (dispatch: Dispatch) => ({
    getUserInfo: (id: string) => dispatch(userGetInfo(id))
});

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(Bar)
);
