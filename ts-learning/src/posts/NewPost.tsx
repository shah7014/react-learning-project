import React, {useState} from "react";
import {Post} from "../types";

const NewPost: React.FC  = () => {

    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");

    const [post, setPost] = useState<Post | null>(null)

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setPost({
            title: title,
            body: desc,
            id: Math.random()
        })
    }

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
    }

    const handleDescChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDesc(e.target.value);
    }

    return <form onSubmit={handleSubmit}>
        <input type={"text"} name={"title"} onChange={handleTitleChange} placeholder={"title"}/>
        <input type={"text"} name={"desc"} onChange={handleDescChange} placeholder={"body"} style={{marginLeft: "1rem"}}/>
        <button type={"submit"}>Submit</button>
    </form>
}


export default NewPost;

