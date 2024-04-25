import React from "react";
import {useGetPostsQuery} from "../api/apiSlice";
import {Box, Button, Card, CardContent, Stack, Typography} from "@mui/material";
import {Link} from "react-router-dom";

const PostList = () => {

    const {
        isLoading,
        isSuccess,
        isError,
        data,
        error
    } = useGetPostsQuery();


    return <>
        <Stack flexDirection={"row"} justifyContent={"flex-end"} mb={2}>
            <Button variant={"contained"} component={Link} to={"/posts/create"}>Create Post</Button>
        </Stack>
        <Stack
            flexDirection={"column"}
            gap={"2rem"}
        >
            {isSuccess && data.map(p => <Card key={p.id}>
                <CardContent
                    component={Stack}
                    flexDirection={"column"}
                    gap={"1rem"}
                >
                    <Typography variant={"h3"}>{p.title}</Typography>
                    <Typography variant={"body1"}>{p.body.slice(0, 30)}...</Typography>
                    <Link to={`/posts/${p.id}`}>View More Details</Link>
                </CardContent>
            </Card>)}
        </Stack>
    </>
}

export default PostList;

