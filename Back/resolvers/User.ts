import { IUser } from "../typings";

export default {
    _id: (parent: IUser) => parent._id,
    username: (parent: IUser) => parent.username,
    password: (parent: IUser) => parent.password,
    role: (parent: IUser) => parent.role,
    signature: (parent: IUser) => parent.signature,
    createDate: (parent: IUser) => parent.createDate
};
