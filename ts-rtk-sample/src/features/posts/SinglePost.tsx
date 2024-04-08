import React from "react";
import {useSelector} from "react-redux";
import {postByIdSelector} from "./postsSlice";
import {RootState} from "../../state/store";
import {Button, Stack, Typography} from "@mui/material";
import {Link, useParams} from "react-router-dom";
import {Post} from "../../types";
import PostAuthor from "./PostAuthor";

const SinglePost = () => {

    const {id: postId} = useParams();

    const post = useSelector((state: RootState) => postByIdSelector(state, Number(postId)));

    console.log(post)


    if (!post) {
        return <Typography variant={"h4"} color={"error"}>Post with {postId} not found</Typography>
    }

    return <Stack flexDirection={"column"} gap={"2rem"}>
        <Typography variant={"h3"}>{post.title}</Typography>
        <Typography variant={"body1"}>{post.body}</Typography>
        <PostAuthor post={post} />
        <Button component={Link} to={"/"}>Go Back</Button>
    </Stack>
}

export default SinglePost;

