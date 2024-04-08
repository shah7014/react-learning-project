import React, {useState} from "react";
import {nanoid} from "@reduxjs/toolkit";
import {usersSelector} from "../users/usersSlice";
import {useDispatch, useSelector} from "react-redux";
import {Button, MenuItem, styled, TextField} from "@mui/material";
import {Post} from "../../types";
import {AppDispatch} from "../../state/store";
import {addPost} from "./postsSlice";


const Form = styled("form")({
    margin: "2rem 0"
})

const NewPostForm = () => {

    const users = useSelector(usersSelector);

    const [title, setTitle] = useState("")
    const [body, setBody] = useState("")
    const [userId, setUserId] = useState<number>(0);

    const dispatch = useDispatch<AppDispatch>()

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (userId) {
            const newPost: any = {
                title,
                body,
                userId
            }
            dispatch(addPost(newPost));
        }
    }

    return <Form onSubmit={handleSubmit}>
        <TextField placeholder={"title"}
                   value={title}
                   onChange={e => setTitle(e.target.value)}
                   fullWidth
                   sx={{marginTop: "1rem"}}
        />
        <TextField placeholder={"body"}
                   value={body}
                   onChange={e => setBody(e.target.value)}
                   fullWidth
                   sx={{marginTop: "1rem"}}
        />

        <TextField
            sx={{marginTop: "1rem"}}
            select
            value={userId}
            onChange={e => setUserId(Number(e.target.value))}
            fullWidth
        >
            <MenuItem value={0} disabled>select user</MenuItem>
            {users.map(u => (<MenuItem value={u.id}>{u.name}</MenuItem>))}
        </TextField>

        <Button sx={{marginTop: "1.5rem"}} type={"submit"}>Add New Post</Button>
    </Form>
}


export default NewPostForm;

