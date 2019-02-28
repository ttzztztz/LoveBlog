import { MongoClient } from "mongodb";
const mongoURL = process.env.MODE === "DEV" ? "localhost" : "mongodb";

export const dbConnect = async function() {
    const client = await MongoClient.connect(`mongodb://${mongoURL}:27017/love`, { useNewUrlParser: true });
    return { db: client.db("love"), client: client };
};
