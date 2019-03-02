export default `
    type Mutation {
        userLogin(username: String!, password: String!): AuthPayload!
        userCreate(username: String!, password: String!, role: String!): String!
        userUpdatePwd(password: String!): Int!
        userUpdateRole(role: String!): Int!
        userUpdateSignature(signature: String!): Int!
        blogInsert(title: String!, content: String!): String!
        blogUpdate(_id: String!, title: String!, content: String!): Int!
        commentInsert(content: String!): String!
        commentUpdate(_id: String!, content: String!): Int!
    }
`;
