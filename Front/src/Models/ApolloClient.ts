import ApolloClient from "apollo-boost";

const client = new ApolloClient({
    uri: "http://localhost:8082/",
    headers: {
        Authorization: localStorage.getItem("token")
    }
});

export default client;
