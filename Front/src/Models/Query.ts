import gql from "graphql-tag";

export const GET_USER = (id: string) => gql`
    query{
        user(username:"${id}"){
            _id
            username
            role
            signature
            createDate
        }
    }
`;

export const GET_BLOG = (id: string) => gql`
    query{
        blog(_id:"${id}"){
            _id
            author {
                username
                role
                signature
            }
            title
            content
            createDate
            comment {
                author {
                    username
                    role
                    signature
                }
                content
                createDate
            }
        }
    }
`;

export const GET_BLOG_LIST = (page: number) => gql`
    query{
        blogList(page:${page}){
            _id
            author {
                username
            }
            title
            createDate
        }
    }
`;
