import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {loadAllComments, selectCommentIds} from "./commentsSlice";
import SingleComment from "./SingleComment";
import {AppDispatch} from "../../store";

const CommentsList = () => {

    const commentIds = useSelector(selectCommentIds);

    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        dispatch(loadAllComments())
    }, [])

    return <>
        {commentIds.map(commentId => <SingleComment key={commentId} commentId={commentId}/>)}
    </>
}

export default CommentsList;
