import React, {useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../state/store";
import {postByIdSelector, updatedPost} from "./postsSlice";
import {usersSelector} from "../users/usersSlice";
import {Button, MenuItem, TextField, Typography} from "@mui/material";
import {Post} from "../../types";

const EditPostForm = () => {

    const {id: postId} = useParams();

    const navigate = useNavigate();

    const post = useSelector((state: RootState) => postByIdSelector(state, Number(postId)));

    const users = useSelector(usersSelector);

    const dispatch = useDispatch<AppDispatch>();

    const [title, setTitle] = useState(post?.title);
    const [body, setBody] = useState(post?.body);
    const [userId, setUserId] = useState(post?.userId);

    if (!post) {
        return <Typography variant={"h3"} color={"error"}>post with id {postId} not found</Typography>
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (title !== "" && body !== "" && !!userId) {
            try {
                const newPost: Partial<Post> = {
                    id: post.id,
                    title,
                    body,
                    userId,
                    reactions: post.reactions
                }
                const response = await dispatch(updatedPost(newPost)).unwrap();
                navigate("/");
            } catch (err) {
                console.log("ERROR IN EDIT POST:-", err);
            }
        }
    }


    return <form onSubmit={handleSubmit}>
        <TextField
            label={"Post Title"}
            placeholder={"title"}
                   value={title}
                   onChange={e => setTitle(e.target.value)}
                   fullWidth
                   sx={{marginTop: "1rem"}}
        />
        <TextField
            label={"Post Body"}
            placeholder={"body"}
                   value={body}
                   onChange={e => setBody(e.target.value)}
                   fullWidth
                   sx={{marginTop: "1rem"}}
        />

        <TextField
            title={"Author"}
            sx={{marginTop: "1rem"}}
            select
            value={userId}
            onChange={e => setUserId(Number(e.target.value))}
            fullWidth
        >
            <MenuItem value={0} disabled>select user</MenuItem>
            {users.map(u => (<MenuItem value={u.id}>{u.name}</MenuItem>))}
        </TextField>

        <Button sx={{marginTop: "1.5rem"}} type={"submit"}>Edit Post</Button>
    </form>
}

export default EditPostForm;

