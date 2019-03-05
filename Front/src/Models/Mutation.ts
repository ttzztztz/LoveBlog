import gql from "graphql-tag";

export const USER_LOGIN = (username: string, password: string) => gql`
    mutation{
        userLogin(username:"${username}" ,  password:"${password}"){
            code
            token
        }
    }
`;

export const BLOG_INSERT = (title: string, content: string) => gql`
    mutation{
        blogInsert(title:"${title}" , content: "${content}")
    }
`;

export const COMMENT_INSERT = (blogId: string, content: string) => gql`
    mutation{
        commentInsert(blogId:"${blogId}" , content: "${content}")
    }
`;
