import React from "react";
import {useGetAllPostsQuery} from "./postsSlice";
import {Card, CardActions, CardContent, CardHeader, Typography} from "@mui/material";
import {Link} from "react-router-dom";
import {useGetAllUsersQuery} from "../users/usersSlice";
import PostAuthor from "./PostAuthor";

const PostsExcerpt = ({postId}: { postId: string }) => {

    const {post} = useGetAllPostsQuery(undefined, {
        selectFromResult: (result) => ({
            post: result.data?.entities[postId]
        })
    })


    return <>
        {post && <Card sx={{padding: "1rem"}}>
            <CardContent>
                <Typography variant={"h4"} component={"h2"}>{post.title}</Typography>
                <Typography variant={"body1"}>{post.body.substring(0, 75)}...</Typography>
            </CardContent>
            <CardActions>
                <Link to={`/posts/${post.id}`}>View Post</Link>
                <PostAuthor userId={post.userId}/>
            </CardActions>
        </Card>}
    </>
}

export default PostsExcerpt;
