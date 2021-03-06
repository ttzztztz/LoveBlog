import { ObjectID } from "mongodb";

// <-- Basic interface
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
    author: IUser | ObjectID | string;
    content: string;
    createDate: Date;
}
export interface IBlog {
    _id?: ObjectID | string;
    author: IUser | ObjectID | string;
    title: string;
    content: string;
    createDate: Date;
    comment: Array<IComment | ObjectID | string>;
}
// <-- Extensions interface
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
export interface IUserLoginArg {
    username: string;
    password: string;
}
export interface IJWTContent {
    uid: string;
    username: string;
    role: string;
}
export interface AuthPayload {
    code: number;
    token: string;
}
export interface IUserCreateArg {
    username: string;
    password: string;
    role: string;
}
export interface IUserQueryArg {
    username: string;
}
export interface IBlogQueryArg {
    _id: string;
}
export interface IBlogListArg {
    page: number;
}
