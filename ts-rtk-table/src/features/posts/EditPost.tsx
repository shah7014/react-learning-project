import React, {useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {useEditPostMutation, useGetSinglePostQuery} from "../api/apiSlice";
import {Button, styled, TextField, Typography} from "@mui/material";
import {TPost} from "./types";

const Form = styled("form")({
    display: "flex",
    flexDirection: "column",
    gap: "1.25rem",
    alignItems: "center"
})

const EditPost = () => {

    const {id} = useParams() as { id: string };

    const {data: post} = useGetSinglePostQuery(id);

    const [title, setTitle] = useState(post?.title ?? "");

    const [body, setBody] = useState(post?.body ?? "");

    const [editPost] = useEditPostMutation();

    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (post) {
            try {
                const updatedPost: TPost = {...post, title, body};
                const res = await editPost(updatedPost).unwrap();
                navigate(`/posts/${post.id}`)
            } catch (err) {
                console.log(err);
            }
        }
    }

    return <Form onSubmit={handleSubmit}>
        <Typography variant={"h3"} textAlign={"center"}>Edit a post</Typography>
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

export default EditPost;

