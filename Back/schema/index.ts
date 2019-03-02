import Interface from "./Interface";
import Mutation from "./Mutation";
import Query from "./Query";
import Scalar from "./Scalar";
import Schema from "./Schema";

const graphQL = [Interface, Mutation, Query, Scalar, Schema];

export default graphQL.reduce((str, p) => p + str, "");
