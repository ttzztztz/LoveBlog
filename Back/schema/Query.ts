export default `
    type Query {
        user(username: String!): User
        blog(_id: String!): Blog
        blogList(page: Int!): [Blog!]!
    }
`;
