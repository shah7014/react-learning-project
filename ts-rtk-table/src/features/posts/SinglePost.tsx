import React from "react";
import {useGetSinglePostQuery} from "../api/apiSlice";
import {Link, useParams} from "react-router-dom";
import {Box, Card, CardContent, Stack, Typography} from "@mui/material";

const SinglePost = () => {

    const {id} = useParams() as {id: string};


    const {
        isLoading,
        isError,
        isSuccess,
        data: post
    } = useGetSinglePostQuery(id)

    return <Box>
        {isSuccess && <Card>
            <CardContent
                component={Stack}
                flexDirection={"column"}
                gap={"1rem"}
            >
                <Typography variant={"h3"}>{post.title}</Typography>
                <Typography variant={"h6"}>{post.body}</Typography>
                <Link to={`/posts/edit/${post.id}`}>Edit Post</Link>
            </CardContent>
        </Card>}
    </Box>
}

export default SinglePost;

