import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {loadAllComments, selectAllLikes, selectAllTags, selectCommentIds, updateLikes} from "./commentsSlice";
import SingleComment from "./SingleComment";
import {AppDispatch} from "../../store";
import {Button, Card, CardContent, Grid, Typography} from "@mui/material";

const CommentsList = () => {

    const commentIds = useSelector(selectCommentIds);

    const tags = useSelector(selectAllTags);

    const likes = useSelector(selectAllLikes);

    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        dispatch(loadAllComments())
    }, [])

    return <>
        <Button onClick={() => {
            dispatch(updateLikes({id: "a3ea012c-011d-4b0c-89c8-57bd357312df", suffix: "Its tesing"}))
        }} variant={"contained"}>Update Like 1</Button>
        {commentIds.map(commentId => <SingleComment key={commentId} commentId={commentId}/>)}

        <Grid container>
            <Grid item xs={12} md={6}>
                <Typography variant={"h4"} sx={{margin: "1.5rem"}}>Tags</Typography>
                {tags.map(tag => <Card sx={{margin: "1rem"}} key={tag.id}>
                    <CardContent>
                        <Typography variant={"h5"}>{tag.id}</Typography>
                        <Typography variant={"body1"}>{tag.jobType}</Typography>
                    </CardContent>
                </Card>)}
            </Grid>
            <Grid item xs={12} md={6}>
                <Typography variant={"h4"} sx={{margin: "1.5rem"}}>Likes</Typography>
                {likes.map(like => <Card sx={{margin: "1rem"}} key={like.id}>
                    <CardContent>
                        <Typography variant={"h5"}>{like.id}</Typography>
                        <Typography variant={"body1"}>{like.suffix}</Typography>
                    </CardContent>
                </Card>)}
            </Grid>
        </Grid>



    </>
}

export default CommentsList;
