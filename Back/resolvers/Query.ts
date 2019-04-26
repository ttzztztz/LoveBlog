import { dbConnect } from "../models/db";
import { PAGESIZE } from "../models/consts";
import { ObjectID } from "mongodb";
import { IUser, IBlog, IUserQueryArg, IBlogQueryArg, IBlogListArg } from "../typings";
import { verifyJWT } from "../models/check";

export default {
    user: async (_parent: any, args: IUserQueryArg, context: any) => {
        const { username } = args;
        const { db, client } = await dbConnect();
        try {
            verifyJWT(context.request.header("Authorization"));
            const result = await db.collection("user").findOne({
                username: username
            });
            return result as IUser;
        } catch (e) {
            console.log(e);
        } finally {
            client.close();
        }
        return null;
    },
    blog: async (_parent: any, args: IBlogQueryArg, context: any) => {
        const { _id } = args;
        const { db, client } = await dbConnect();
        try {
            verifyJWT(context.request.header("Authorization"));
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
    blogList: async (_parent: any, args: IBlogListArg, context: any) => {
        const { page } = args;
        const { db, client } = await dbConnect();
        try {
            verifyJWT(context.request.header("Authorization"));
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
