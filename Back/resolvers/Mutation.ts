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
    IBlog
} from "../typings";
import { verifyJWT } from "../models/check";

export default {
    async userUpdatePwd(_parent: any, args: IUserUpdatePwdArgs, context: any) {
        const { password } = args;
        const { uid } = verifyJWT(context.request.header("Authorization"));

        const { db, client } = await dbConnect();

        try {
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
        const { uid } = verifyJWT(context.request.header("Authorization"));

        const { db, client } = await dbConnect();

        try {
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
        const { uid } = verifyJWT(context.request.header("Authorization"));

        const { db, client } = await dbConnect();

        try {
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
        const { uid } = verifyJWT(context.request.header("Authorization"));
        const { title, content } = args;
        const { db, client } = await dbConnect();

        try {
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
        const { uid } = verifyJWT(context.request.header("Authorization"));
        const { blogId, content } = args;
        const { db, client } = await dbConnect();

        try {
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
        const { uid } = verifyJWT(context.request.header("Authorization"));
        const { _id, title, content } = args;
        const { db, client } = await dbConnect();

        try {
            const nowBlogInfo: IBlog | null = await db.collection("blog").findOne({
                _id: new ObjectID(_id)
            });

            if (!nowBlogInfo || nowBlogInfo.author._id !== uid) {
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
        const { uid } = verifyJWT(context.request.header("Authorization"));
        const { _id, content } = args;
        const { db, client } = await dbConnect();

        try {
            const nowCommentInfo: IBlog | null = await db.collection("blog").findOne({
                comment: {
                    $elemMatch: {
                        _id: new ObjectID(_id)
                    }
                }
            });

            if (!nowCommentInfo || nowCommentInfo.author._id !== uid) {
                return 0;
            }

            nowCommentInfo.comment[0].content = content;
            delete nowCommentInfo._id;

            const result = await db.collection("blog").findOneAndUpdate(
                {
                    _id: nowCommentInfo._id!
                },
                {
                    $set: nowCommentInfo
                }
            );

            return result.ok;
        } catch (e) {
            console.log(e);
        } finally {
            client.close();
        }
        return 0;
    }
};
