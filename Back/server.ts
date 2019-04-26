require("dotenv").config();

import { GraphQLServer, Options } from "graphql-yoga";
import resolvers from "./resolvers";
import schemas from "./schema";

const server = new GraphQLServer({
    typeDefs: schemas,
    resolvers: resolvers,
    resolverValidationOptions: {
        requireResolversForResolveType: false
    },
    context: request => ({
        ...request
    })
});

const serverOptions: Options = {
    port: 8082,
    playground: "/graphql"
};

server.start(serverOptions, () => console.log("Rabbit WebServer is running on port 8082"));
