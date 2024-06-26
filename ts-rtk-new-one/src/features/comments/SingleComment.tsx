import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../store";
import {deleteCommentById, selectCommentById, selectTagsForComment} from "./commentsSlice";
import {Button, Card, CardActions, CardContent, Chip, Stack, Typography} from "@mui/material";
import EditComment from "./EditComment";

const SingleComment = ({commentId}: { commentId: string }) => {

    const dispatch = useDispatch<AppDispatch>();

    const comment = useSelector((state: RootState) => selectCommentById(state, commentId));

    const tagsForComment = useSelector((state: RootState) => selectTagsForComment(state, comment.tagIds));

    const [open, setOpen] = useState(false);

    const handleEdit = () => {
        setOpen(true);
    }

    return <>
        <Stack
            flexDirection={"column"}
            gap={"1rem"}
        >
            <Card variant={"outlined"} sx={{marginBottom: "2rem", padding: "1.5rem"}}>
                <CardContent>
                    <Typography variant={"h6"}>({comment.id})</Typography>
                    <Typography variant={"body1"}>{comment.body}</Typography>
                    {tagsForComment.map((tag) => <Chip label={tag.jobType} key={tag.id} />)}
                </CardContent>
                <CardActions>
                    <Button variant={"contained"} color={"error"} onClick={() => dispatch(deleteCommentById(commentId))}>Delete</Button>
                    <Button variant={"contained"} color={"warning"} onClick={handleEdit}>Edit</Button>
                </CardActions>
            </Card>
        </Stack>

        <EditComment open={open} onClose={() => setOpen(false)} comment={comment} />
    </>
}

export default SingleComment;
