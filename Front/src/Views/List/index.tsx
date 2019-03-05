import React from "react";

import BlogItem from "../../Components/ListItem";
import { RouteComponentProps } from "react-router";

interface IBlogItem {
    _id: string;
    author: { username: string };
    title: string;
    content: string;
    createDate: Date;
}

class List extends React.PureComponent<RouteComponentProps> {
    state = {
        blogList: [] as Array<IBlogItem>,
        totalCount: 0
    };
    render() {
        const blogItemList = this.state.blogList.map(item => (
            <BlogItem
                _id={item._id}
                title={item.title}
                authorName={item.author.username}
                createDate={item.createDate}
            />
        ));
        return <>{blogItemList}</>;
    }
}

export default List;
