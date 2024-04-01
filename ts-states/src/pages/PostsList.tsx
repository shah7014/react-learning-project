import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getPosts} from "../state/actions/postActions";
import {AppDispatch, RootState} from "../state/store";
import {Post} from "../types";
import {Button, Card, CardActions, CardContent, Typography} from "@mui/material";
import {Link as RouterLink} from "react-router-dom"

const PostsList = () => {

    const post: {posts: Post[]} = useSelector((state: RootState) => state.post);

    const dispatch = useDispatch<AppDispatch>();


    // TODO: how to define type for dispatch here?
    useEffect(() => {
        // @ts-ignore
        dispatch(getPosts());
    }, [dispatch])

    return <>
        {post.posts.map(p => (<Card key={p.id} sx={{marginBottom: "0.5rem"}}>

            <CardContent>
                <Typography variant={"h4"}>{p.title}</Typography>
                <Typography variant={"body1"}>{p.body}</Typography>
            </CardContent>

            <CardActions>
                <Button component={RouterLink} to={`/posts/${p.id}`}>More</Button>
            </CardActions>
        </Card>))}
    </>
}

export default PostsList;

