require("dotenv").config();

import { dbConnect } from "../models/db";
import { IUser, IBlog, IComment } from "../typings";
import { addSaltPasswordOnce } from "../models/check";

(async () => {
    const { db, client } = await dbConnect();
    try {
        // <-- Init User
        const userObj: IUser = {
            username: "Faraway",
            password: addSaltPasswordOnce("P@ssw0rd"),
            role: "Boy",
            signature: "hzytql",
            createDate: new Date()
        };
        const userResult = await db.collection("user").insertOne(userObj);
        // <-- Init Blog
        const blogObj: IBlog = {
            author: userResult.insertedId,
            title: "hzytql",
            content: "洪志远学长太强了",
            createDate: new Date(),
            comment: [] as Array<IComment>
        };
        const blogResult = await db.collection("blog").insertOne(blogObj);
        // <-- Init Comment
        const commentObj: IComment = {
            author: userResult.insertedId,
            content: "我也觉得洪志远学长太强了",
            createDate: new Date()
        };
        await db.collection("blog").updateOne(
            {
                _id: blogResult.insertedId
            },
            {
                $push: {
                    comment: commentObj
                }
            }
        );
    } catch (e) {
        console.log(e);
    } finally {
        client.close();
    }
})();
