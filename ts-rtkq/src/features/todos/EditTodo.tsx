import React, {useEffect, useState} from "react";
import {Button, Checkbox, MenuItem, styled, TextField} from "@mui/material";
import {useNavigate, useParams} from "react-router-dom";
import {useSelector} from "react-redux";
import {selectAllUsers} from "../users/usersSlice";
import {useGetTodoQuery, useUpdateTodoMutation} from "./todosSlice";

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
    const [authorId, setAuthorId] = useState<number>(0);

    const {data} = useGetTodoQuery(id ?? "");

    const [updateTodo] = useUpdateTodoMutation();

    const navigate = useNavigate();

    useEffect(() => {
        if (data) {
            console.log(data)
            setTitle(data.title);
            setIsCompleted(data.completed);
            setAuthorId(data.userId);
        }
    }, [data])

    const users = useSelector(selectAllUsers);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (data) {
            try {
                await updateTodo({...data, title, completed: isCompleted, userId: authorId}).unwrap();
                navigate(`/todos/${data.id}`)
            } catch (err) {
                console.log("Error updating todo")
            }
        }
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
        <TextField
            select
            value={authorId}
            onChange={e => setAuthorId(Number(e.target.value))}
        >
            <MenuItem value={0} disabled>{"Select a User"}</MenuItem>
            {users.map(u => <MenuItem key={u.id} value={u.id}>{u.name}</MenuItem>)}
        </TextField>
        <Button variant={"contained"} type={"submit"}>Submit</Button>
    </Form>
}

export default EditTodo;

