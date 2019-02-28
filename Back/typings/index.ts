import { ObjectID } from "mongodb";

export interface IUser {
    id?: ObjectID | string;
    username: string;
    password: string;
    role: string;
    signature: string;
    createDate: Date;
}
export interface IComment {
    id?: ObjectID | string;
    author: IUser;
    content: string;
    createDate: Date;
}
export interface IBlog {
    id?: ObjectID | string;
    author: IUser;
    title: string;
    content: string;
    createDate: Date;
    Comment: Array<IComment>;
}
