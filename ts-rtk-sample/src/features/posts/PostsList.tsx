import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {addReaction, loadPosts, postsSelector} from "./postsSlice";
import {Box, Button, Grid, Stack, Typography} from "@mui/material";
import {AppDispatch} from "../../state/store";
import {ReactionsType} from "../../types";
import PostAuthor from "./PostAuthor";
import {Link} from "react-router-dom";

const reactionsMap: Record<ReactionsType, string> = {
    thumbsUp: "👍",
    rocket: "🚀",
    coffee: "☕️"
}

const PostsList = () => {

    const posts = useSelector(postsSelector);


    const dispatch = useDispatch<AppDispatch>()

    useEffect(() => {
        const getPosts = async () => {
            try {
                const response = await dispatch(loadPosts()).unwrap();
                console.log(response)
            } catch(err) {
                console.log(err);
            }
        }

        getPosts();
    }, [])

    return <Grid container>
        {posts.map(p => (<Grid item xs={12} md={6} lg={4} sx={{padding: "1rem"}} key={p.id}>
            <Typography textAlign={"center"} variant={"h4"}>{p.title.substring(0, 20)}</Typography>
            <Typography sx={{marginTop: "1rem"}} variant={"body1"}>{p.body.substring(0, 100)}</Typography>
            <PostAuthor post={p} />
            <Button component={Link} to={`/posts/${p.id}`}>Go to Post</Button>
            <Button component={Link} to={`/posts/edit/${p.id}`}>Edit Post</Button>
            <Stack flexDirection={"row"} gap={"1rem"} alignItems={"center"} sx={{marginTop: "1rem"}}>
                {Object.entries(p.reactions).map(([name, count]) => {
                    return <Button key={name} onClick={() => dispatch(addReaction({
                        reactionName: (name as ReactionsType),
                        postId: p.id
                    }))}>{reactionsMap[name as ReactionsType]} {count}</Button>
                })}
            </Stack>
        </Grid>))}
    </Grid>
}

export default PostsList;

