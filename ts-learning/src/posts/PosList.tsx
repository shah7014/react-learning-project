import React from "react";
import {Post} from "../types";
import PostCard from "./PostCard";

const posts: Post[] = [
    {id: 1, title: "post1", body: "body1"},
    {id: 2, title: "post2", body: "body2"},
    {id: 3, title: "post3", body: "body3"},
    {id: 4, title: "post4", body: "body4"},
    {id: 5, title: "post5", body: "body5"},
]


const PosList: React.FC<{}> = () => {
    return <>
        {posts.map((post) => <PostCard key={post.id} {...post} />)}
    </>
}


export default PosList;
