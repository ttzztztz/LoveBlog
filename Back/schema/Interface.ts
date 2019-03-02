export default `
    interface IUser {
        username: String!
        password: String!
    }

    interface IBlog {
        author: User!
        title: String!
        content: String!
    }

    interface IComment {
        author: User!
        content: String
    }
`;
