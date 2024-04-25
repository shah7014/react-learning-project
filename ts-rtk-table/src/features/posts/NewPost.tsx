import React, {useState} from "react";
import {Button, styled, TextField, Typography} from "@mui/material";
import {useCreatePostMutation} from "../api/apiSlice";

const Form = styled("form")({
    display: "flex",
    flexDirection: "column",
    gap: "1.25rem",
    alignItems: "center"
})

const NewPost = () => {

    const [createNewPost, {isLoading}] = useCreatePostMutation();

    const [title, setTitle] = useState("");

    const [body, setBody] = useState("");

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            if (title.trim() && body.trim()) {
                await createNewPost({title, body, userId: 1, id: String(title.length + 1000)}).unwrap();
                setTitle("");
                setBody("");
            }
        } catch (err) {
            console.log(err)
        }

    }

    return <Form onSubmit={handleSubmit}>
        <Typography variant={"h3"} textAlign={"center"}>Create a new post</Typography>
        <TextField
            label={"Post Title"}
            placeholder={"Enter something..."}
            value={title}
            onChange={e => setTitle(e.target.value)}
            sx={{width: "75%"}}
        />
        <TextField
            label={"Post Body"}
            placeholder={"Enter something..."}
            value={body}
            onChange={e => setBody(e.target.value)}
            sx={{width: "75%"}}
        />

        <Button type={"submit"} variant={"contained"}>Submit</Button>
    </Form>
}

export default NewPost;

