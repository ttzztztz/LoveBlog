import { IBlog, IUser } from "../typings";
import { dbConnect } from "../models/db";
import { ObjectID } from "mongodb";

export default {
    _id: (parent: IBlog) => parent._id,
    author: async (parent: IBlog) => {
        const { db, client } = await dbConnect();
        try {
            const authorResult = await db.collection("user").findOne({
                _id: new ObjectID(parent.author as string | ObjectID)
            });
            return authorResult;
        } catch (e) {
            console.log(e);
        } finally {
            client.close();
        }
        return {
            username: "",
            password: "",
            role: "",
            signature: "",
            createDate: new Date()
        } as IUser;
    },
    title: (parent: IBlog) => parent.title,
    content: (parent: IBlog) => parent.content,
    createDate: (parent: IBlog) => parent.createDate,
    comment: async (parent: IBlog) => {
        const { db, client } = await dbConnect();
        try {
            return Promise.all(
                (parent.comment as any[]).map(async item => {
                    item.author = await db.collection("user").findOne({
                        _id: new ObjectID(item.author)
                    });
                    return item;
                })
            );
        } catch (e) {
            console.log(e);
        } finally {
            client.close();
        }

        return [];
    }
};
