export default `
    type Query {
        user(_id: String!): User
        blog(_id: String!): Blog
        blogList(page: Int!): [Blog!]!
    }
`;
