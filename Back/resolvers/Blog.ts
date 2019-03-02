import { IBlog } from "../typings";

export default {
    _id: (parent: IBlog) => parent._id,
    author: (parent: IBlog) => parent.author,
    title: (parent: IBlog) => parent.title,
    content: (parent: IBlog) => parent.content,
    createDate: (parent: IBlog) => parent.createDate,
    comment: (parent: IBlog) => parent.comment
};
