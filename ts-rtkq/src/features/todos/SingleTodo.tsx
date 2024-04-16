import React from "react";
import {Link, useParams} from "react-router-dom";
import {Button, Stack, Typography} from "@mui/material";
import {useSelector} from "react-redux";
import {RootState} from "../../store";
import {selectUserById} from "../users/usersSlice";
import {useGetTodoQuery} from "./todosSlice";

const SingleTodo = () => {
    const {id} = useParams();

    const {data: todo} = useGetTodoQuery(id ?? "");

    const user = useSelector((state: RootState) => selectUserById(state, todo?.userId ?? 1))

    return <Stack flexDirection={"column"} gap={"1rem"}>
        {todo && <>
            <Typography variant={"body1"}>ID:- {todo.id}</Typography>
            <Typography variant={"body1"}>TITLE:- {todo.title}</Typography>
            <Typography variant={"body1"}>USER:- {user?.name}</Typography>
            <Link to={"/todos"}>Go Back to List</Link>
            <Link to={`/todos/edit/${id}`}>Edit Todo</Link>
        </>}
    </Stack>
}

export default SingleTodo

