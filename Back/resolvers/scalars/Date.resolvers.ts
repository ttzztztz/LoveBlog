import { GraphQLScalarType } from "graphql";

export default new GraphQLScalarType({
    name: "Date",
    description: "Date custom scalar type",
    parseValue(value) {
        return new Date(value);
    },
    serialize(value) {
        return new Date(value);
    },
    parseLiteral(ast) {
        if (ast.kind === "IntValue") {
            return Number.parseInt(ast.value, 10);
        }
        return null;
    }
});
