import { ObjectID } from "mongodb";

export interface IUser {
    _id?: ObjectID | string;
    username: string;
    password: string;
    role: string;
    signature: string;
    createDate: Date;
}
export interface IComment {
    _id?: ObjectID | string;
    blogId: ObjectID | string;
    author: IUser;
    content: string;
    createDate: Date;
}
export interface IBlog {
    _id?: ObjectID | string;
    author: IUser;
    title: string;
    content: string;
    createDate: Date;
    comment: Array<IComment>;
}
export interface IUserUpdatePwdArgs {
    password: string;
}
export interface IUserUpdateRoleArgs {
    role: string;
}
export interface IUserUpdateSignatureArgs {
    signature: string;
}
export interface IBlogInsertArgs {
    title: string;
    content: string;
}
export interface IBlogUpdateArgs {
    _id: string;
    title: string;
    content: string;
}
export interface ICommentUpdateArgs {
    _id: string;
    content: string;
}
export interface ICommentInsertArgs {
    blogId: string;
    content: string;
}
export interface IBlogInsert {
    author: ObjectID;
    title: string;
    content: string;
    createDate: Date;
    comment: Array<IComment>;
}
export interface IBlogUpdate {
    title: string;
    content: string;
}
export interface ICommentPush {
    _id: ObjectID;
    author: ObjectID;
    content: string;
    createDate: Date;
}
