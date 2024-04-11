import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../state/store";
import {addReaction, selectPostById} from "./postsSlice";
import {Button, Grid, Stack, Typography} from "@mui/material";
import PostAuthor from "./PostAuthor";
import {Link} from "react-router-dom";
import {ReactionsType} from "../../types";

const reactionsMap: Record<ReactionsType, string> = {
    thumbsUp: "👍",
    rocket: "🚀",
    coffee: "☕️"
}

const PostDetail = ({postId}: {postId: number}) => {
    const post = useSelector((state: RootState) => selectPostById(state, postId));

    const dispatch = useDispatch<AppDispatch>()

    return <Grid item xs={12} md={6} lg={4} sx={{padding: "1rem"}}>
        <Typography textAlign={"center"} variant={"h4"}>{post.title.substring(0, 20)}</Typography>
        <Typography sx={{marginTop: "1rem"}} variant={"body1"}>{post.body.substring(0, 100)}</Typography>
        <PostAuthor post={post} />
        <Button component={Link} to={`/posts/${post.id}`}>Go to Post</Button>
        <Button component={Link} to={`/posts/edit/${post.id}`}>Edit Post</Button>
        <Stack flexDirection={"row"} gap={"1rem"} alignItems={"center"} sx={{marginTop: "1rem"}}>
            {Object.entries(post.reactions).map(([name, count]) => {
                return <Button key={name} onClick={() => dispatch(addReaction({
                    reactionName: (name as ReactionsType),
                    postId: post.id
                }))}>{reactionsMap[name as ReactionsType]} {count}</Button>
            })}
        </Stack>
    </Grid>
}

export default PostDetail;

