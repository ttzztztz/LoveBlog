import { dbConnect } from "../models/db";
import { PAGESIZE } from "../models/consts";
import { ObjectID } from "mongodb";
import { IUser, IBlog } from "../typings";

export default {
    user: async (_id: string) => {
        const { db, client } = await dbConnect();
        try {
            const result = await db.collection("user").findOne({
                _id: new ObjectID(_id)
            });
            return result as IUser;
        } catch (e) {
            console.log(e);
        } finally {
            client.close();
        }
        return null;
    },
    blog: async (_id: string) => {
        const { db, client } = await dbConnect();
        try {
            const result = await db.collection("blog").findOne({
                _id: new ObjectID(_id)
            });
            return result as IBlog;
        } catch (e) {
            console.log(e);
        } finally {
            client.close();
        }
        return null;
    },
    blogList: async (page: number) => {
        const { db, client } = await dbConnect();
        try {
            const result = await db
                .collection("blog")
                .aggregate([
                    {
                        $sort: {
                            createDate: -1
                        }
                    },
                    {
                        $skip: PAGESIZE * (page - 1)
                    },
                    {
                        $limit: PAGESIZE
                    }
                ])
                .toArray();
            return result as Array<IBlog>;
        } catch (e) {
            console.log(e);
        } finally {
            client.close();
        }
        return [] as Array<IBlog>;
    }
};
