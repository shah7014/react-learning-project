import React, {useState} from "react";
import {Button, Checkbox, styled, TextField} from "@mui/material";
import {useParams} from "react-router-dom";

const Form = styled("form")({
    display: "flex",
    flexDirection: "column",
    gap: "1.5rem",
    alignItems: "flex-start"
})

const EditTodo = () => {

    const {id} = useParams();

    const [title, setTitle] = useState("");
    const [isCompleted, setIsCompleted] = useState(false);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    }


    return <Form onSubmit={handleSubmit}>
        <TextField
            fullWidth
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder={"Title"}
            label={"Updated Title"}
        />
        <Checkbox
            color="success"
            size={"large"}
            checked={isCompleted}
            onChange={e => setIsCompleted(e.target.checked)}
        />
        <Button variant={"contained"} type={"submit"}>Submit</Button>
    </Form>
}

export default EditTodo;

