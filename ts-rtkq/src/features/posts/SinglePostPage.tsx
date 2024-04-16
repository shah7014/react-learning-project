import React from "react";
import {useGetAllPostsQuery} from "./postsSlice";
import {Link, useParams} from "react-router-dom";
import {Card, CardActions, CardContent, Typography} from "@mui/material";
import PostAuthor from "./PostAuthor";

const SinglePostPage = () => {

    const {id} = useParams() as {id: string}

    const {post, isLoading} = useGetAllPostsQuery(undefined, {
        selectFromResult: ({data, isLoading}) => {
            return {
                post: data?.entities[id],
                isLoading
            }
        }
    })


    return <>
        {isLoading && <Typography variant={"h6"}>Loading...</Typography>}
        {post && <Card>
            <CardContent>
                <Typography variant={"h4"} component={"h2"}>{post.title}</Typography>
                <Typography variant={"body1"}>{post.body}</Typography>
            </CardContent>
            <CardActions>
                <Link to={`/posts/edit/${post.id}`}>Edit Post</Link>
                <PostAuthor userId={post.userId}/>
            </CardActions>
        </Card>}
    </>
}

export default SinglePostPage;

