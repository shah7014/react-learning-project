import React from "react";
import {useGetAllTodosQuery} from "../todos/todosSlice";
import {Stack, Typography} from "@mui/material";
import PostsExcerpt from "./PostsExcerpt";
import {useGetAllPostsQuery} from "./postsSlice";

const PostsList = () => {

    const {
        isLoading,
        isSuccess,
        isError,
        data,
        error
    } = useGetAllPostsQuery();

    return <>
        {isLoading && <Typography variant={"h6"}>Loading...</Typography>}
        {isError && <Typography variant={"h6"} color={"red"}>{error.toString()}</Typography>}
        {isSuccess && <Stack
            flexDirection={"column"}
            gap={"1rem"}
        >
            {data.ids.map(id => <PostsExcerpt postId={String(id)} key={id}/>)}
        </Stack>}
    </>
}

export default PostsList;

