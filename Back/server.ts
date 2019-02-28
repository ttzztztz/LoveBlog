require("dotenv").config();

import { GraphQLServer, Options } from "graphql-yoga";
import Resolvers from "./resolvers";

const typeDefs = [
    "./schema/Interface.graphql",
    "./schema/Mutation.graphql",
    "./schema/Query.graphql",
    "./schema/Scalar.graphql",
    "./schema/Schema.graphql"
];

const server = new GraphQLServer({
    typeDefs,
    resolvers: Resolvers
});

const serverOptions: Options = {
    port: 6666
};

server.start(serverOptions, () => console.log("Rabbit WebServer is running on port 6666"));
