import React, {useState} from "react";
import {Box, Checkbox, IconButton, Paper, styled, TextField, Typography} from "@mui/material";
import {Delete, Upload, Visibility} from "@mui/icons-material";
import {TTodo} from "../../model/Todo";
import {v4 as uuid} from "uuid";
import {Link, useNavigate} from "react-router-dom";
import {
    selectAllTodos,
    useCreateTodoMutation,
    useDeleteTodoMutation,
    useGetAllTodosQuery,
    useUpdateTodoMutation
} from "./todosSlice";
import {useSelector} from "react-redux";
import {selectUserById} from "../users/usersSlice";
import {RootState} from "../../store";

const Form = styled("form")({
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: "2rem",
    margin: "2rem 0",
    padding: "2rem",
    background: "#FFFAFA"
})

const TodoAuthor = ({userId}: {userId: any}) => {

    const author = useSelector((state: RootState) => selectUserById(state, userId));

    return <Link to={`/users/${userId}`}>{author?.name}</Link>
}

const TodoOperations = () => {

    const [title, setTitle] = useState("")

    const {
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetAllTodosQuery()
    const todos = useSelector(selectAllTodos);

    const [deleteTodo] = useDeleteTodoMutation();

    const [createTodo] = useCreateTodoMutation();

    const navigate = useNavigate();

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
        {isError && <Typography textAlign={"center"} color={"error"} variant={"h5"}>{error.toString()}</Typography>}
        {todos && Object.values(todos).map(t => (
            <Paper key={t.id}
                   sx={{
                       display: "flex",
                       flexDirection: "column",
                       margin: "2rem 0",
                       padding: "1.5rem",
                       gap: "1rem"
                   }}
            >
                <Typography variant={"h6"}>{t.title}</Typography>
                <Typography variant={"body1"}>{t.date}</Typography>
                <TodoAuthor userId={t.userId} />
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
