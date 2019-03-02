import { dbConnect } from "../models/db";
import { ObjectID } from "mongodb";
import {
    IUserUpdatePwdArgs,
    IUserUpdateRoleArgs,
    IUserUpdateSignatureArgs,
    ICommentUpdateArgs,
    IBlogInsertArgs,
    ICommentInsertArgs,
    IBlogUpdateArgs,
    IComment,
    IBlogInsert,
    ICommentPush,
    IBlogUpdate,
    IBlog,
    IUser,
    IUserLoginArg,
    AuthPayload,
    IUserCreateArg
} from "../typings";
import { verifyJWT, addSaltPasswordOnce, signJWT } from "../models/check";

export default {
    async userUpdatePwd(_parent: any, args: IUserUpdatePwdArgs, context: any) {
        const { password } = args;
        const { db, client } = await dbConnect();

        try {
            const { uid } = verifyJWT(context.request.header("Authorization"));
            const result = await db.collection("user").updateOne(
                {
                    _id: new ObjectID(uid)
                },
                {
                    $set: {
                        password: password
                    }
                }
            );

            return result.modifiedCount;
        } catch (e) {
            console.log(e);
        } finally {
            client.close();
        }
        return 0;
    },
    async userUpdateRole(_parent: any, args: IUserUpdateRoleArgs, context: any) {
        const { role } = args;

        const { db, client } = await dbConnect();

        try {
            const { uid } = verifyJWT(context.request.header("Authorization"));
            const result = await db.collection("user").updateOne(
                {
                    _id: new ObjectID(uid)
                },
                {
                    $set: {
                        role: role
                    }
                }
            );

            return result.modifiedCount;
        } catch (e) {
            console.log(e);
        } finally {
            client.close();
        }
        return 0;
    },
    async userUpdateSignature(_parent: any, args: IUserUpdateSignatureArgs, context: any) {
        const { signature } = args;

        const { db, client } = await dbConnect();

        try {
            const { uid } = verifyJWT(context.request.header("Authorization"));
            const result = await db.collection("user").updateOne(
                {
                    _id: new ObjectID(uid)
                },
                {
                    $set: {
                        signature: signature
                    }
                }
            );

            return result.modifiedCount;
        } catch (e) {
            console.log(e);
        } finally {
            client.close();
        }
        return 0;
    },
    async blogInsert(_parent: any, args: IBlogInsertArgs, context: any) {
        const { title, content } = args;
        const { db, client } = await dbConnect();

        try {
            const { uid } = verifyJWT(context.request.header("Authorization"));
            const insertObj: IBlogInsert = {
                author: new ObjectID(uid),
                title: title,
                content: content,
                createDate: new Date(),
                comment: [] as Array<IComment>
            };

            const result = await db.collection("blog").insertOne(insertObj);

            return result.insertedId.toHexString();
        } catch (e) {
            console.log(e);
        } finally {
            client.close();
        }
        return "0";
    },
    async commentInsert(_parent: any, args: ICommentInsertArgs, context: any) {
        const { blogId, content } = args;
        const { db, client } = await dbConnect();

        try {
            const { uid } = verifyJWT(context.request.header("Authorization"));
            const pushObj: ICommentPush = {
                _id: new ObjectID(),
                author: new ObjectID(uid),
                content: content,
                createDate: new Date()
            };

            const result = await db.collection("blog").updateOne(
                {
                    _id: new ObjectID(blogId)
                },
                {
                    $push: {
                        comment: pushObj
                    }
                }
            );

            return result.modifiedCount;
        } catch (e) {
            console.log(e);
        } finally {
            client.close();
        }
        return 0;
    },
    async blogUpdate(_parent: any, args: IBlogUpdateArgs, context: any) {
        const { _id, title, content } = args;
        const { db, client } = await dbConnect();

        try {
            const { uid } = verifyJWT(context.request.header("Authorization"));
            const nowBlogInfo: IBlog | null = await db.collection("blog").findOne({
                _id: new ObjectID(_id)
            });

            if (!nowBlogInfo || (nowBlogInfo.author as ObjectID).toHexString() !== uid) {
                return 0;
            }

            const updateObj: IBlogUpdate = {
                title: title,
                content: content
            };

            const result = await db.collection("blog").findOneAndUpdate(
                {
                    _id: new ObjectID(_id)
                },
                {
                    $set: updateObj
                }
            );

            return result.ok;
        } catch (e) {
            console.log(e);
        } finally {
            client.close();
        }
        return 0;
    },
    async commentUpdate(_parent: any, args: ICommentUpdateArgs, context: any) {
        const { _id, content } = args;
        const { db, client } = await dbConnect();

        try {
            const { uid } = verifyJWT(context.request.header("Authorization"));
            const nowCommentInfo: IBlog | null = await db.collection("blog").findOne({
                comment: {
                    $elemMatch: {
                        _id: new ObjectID(_id)
                    }
                }
            });

            if (!nowCommentInfo || (nowCommentInfo.author as ObjectID).toHexString() !== uid) {
                return 0;
            }

            (nowCommentInfo.comment as IComment[])[0].content = content;

            const updateObj = Object.entries(nowCommentInfo).reduce(
                ([k, v], p) => {
                    if (k !== "_id") {
                        return {
                            ...p,
                            [k]: v
                        };
                    } else {
                        return p;
                    }
                },
                {} as any
            );

            const result = await db.collection("blog").findOneAndUpdate(
                {
                    _id: nowCommentInfo._id!
                },
                {
                    $set: updateObj
                }
            );

            return result.ok;
        } catch (e) {
            console.log(e);
        } finally {
            client.close();
        }
        return 0;
    },
    userLogin: async (_parent: any, args: IUserLoginArg, _context: any) => {
        const { username, password } = args;

        const { db, client } = await dbConnect();

        try {
            const userInfo: IUser | null = await db.collection("user").findOne({
                username: username
            });
            if (!userInfo || userInfo.password !== addSaltPasswordOnce(password)) {
                return {
                    code: -1,
                    token: ""
                } as AuthPayload;
            } else {
                let uid: string = "";

                if (userInfo!._id instanceof ObjectID) {
                    uid = (userInfo!._id! as ObjectID).toHexString();
                } else {
                    uid = userInfo!._id as string;
                }

                const token = signJWT(uid, userInfo!.username, userInfo!.role);
                return {
                    code: 1,
                    token: token
                };
            }
        } catch (e) {
            console.log(e);
        } finally {
            client.close();
        }
        return {
            code: -1,
            token: ""
        } as AuthPayload;
    },
    userCreate: async (_parent: any, args: IUserCreateArg, _context: any) => {
        const { username, password, role } = args;

        const { db, client } = await dbConnect();
        try {
            const insertObj: IUser = {
                username: username,
                password: addSaltPasswordOnce(password),
                role: role,
                signature: "",
                createDate: new Date()
            };

            const result = await db.collection("user").insertOne(insertObj);

            return result.insertedCount;
        } catch (e) {
            console.log(e);
        } finally {
            client.close();
        }
        return 0;
    }
};
