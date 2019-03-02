export default `
    type User implements IUser {
        _id: String!
        username: String!
        password: String!
        role: String!
        signature: String
        createDate: Date!
    }

    type Blog implements IBlog {
        _id: String!
        author: User!
        title: String!
        content: String!
        createDate: Date!
        comment: [Comment!]!
    }

    type Comment implements IComment {
        _id: String!
        author: User!
        content: String
        createDate: Date!
    }

    type AuthPayload {
        code: Int!
        token: String!
    }
`;
