import React, {useState} from "react";
import {useCreateTodoMutation, useDeleteTodoMutation, useGetAllTodosQuery, useUpdateTodoMutation} from "../api/apiSlice";
import {Box, Checkbox, IconButton, Paper, styled, TextField, Typography} from "@mui/material";
import {Delete, Upload, Visibility} from "@mui/icons-material";
import {TTodo} from "../../model/Todo";
import {v4 as uuid} from "uuid";
import {useNavigate} from "react-router-dom";

const Form = styled("form")({
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: "2rem",
    margin: "2rem 0",
    padding: "2rem",
    background: "#FFFAFA"
})

const TodoOperations = () => {

    const [title, setTitle] = useState("")

    const {data: todos, isLoading, error} = useGetAllTodosQuery();

    const [updateTodo] = useUpdateTodoMutation();

    const [deleteTodo] = useDeleteTodoMutation();

    const [createTodo] = useCreateTodoMutation();

    const navigate = useNavigate();

    const handleUpdate = async (todo: TTodo) => {
        try {
            await updateTodo(todo).unwrap()
        } catch (err) {
            console.log("Error updating todo with id:-", todo.id)
        }
    }

    const handleDelete = (todoId: string) => async () => {
        try {
            await deleteTodo(todoId).unwrap()
        } catch (err) {
            console.log("Error updating todo with id:-", todoId)
        }
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            if (title.trim() !== "") {
                let newTodo: TTodo = {
                    id: uuid(),
                    title,
                    userId: 1,
                    completed: false
                }
                await createTodo(newTodo).unwrap();
                setTitle("");
            }
        }
        catch (err) {
            console.log("Error creating todos");
        }
    }

    return <>

        <Form onSubmit={handleSubmit}>
            <TextField
                placeholder={"Enter New Todo Title"}
                label={"Todo Title"}
                value={title}
                onChange={e => setTitle(e.target.value)}
                sx={{
                    flex: 1
                }}
            />
            <IconButton type={"submit"}>
                <Upload fontSize={"large"}/>
            </IconButton>
        </Form>


        {isLoading && <Typography textAlign={"center"} variant={"h5"}>Loading...</Typography>}
        {error && <Typography textAlign={"center"} color={"error"} variant={"h5"}>{error.toString()}</Typography>}
        {todos && todos.map(t => (
            <Paper key={t.id}
                   sx={{
                       display: "flex",
                       flexDirection: "row",
                       margin: "2rem 0",
                       alignItems: "center",
                       justifyContent: "space-between",
                       padding: "1.5rem"
                   }}
            >
                <Typography variant={"h6"}>{t.title}</Typography>
                <Box>
                    <IconButton sx={{color: "orchid"}} onClick={() => navigate(`/todos/${t.id}`)}>
                        <Visibility />
                    </IconButton>
                    <IconButton sx={{color: "red"}} onClick={handleDelete(t.id)}>
                        <Delete/>
                    </IconButton>
                </Box>
            </Paper>
        ))}
    </>
}

export default TodoOperations;
