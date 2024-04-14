import React from "react";
import {Link, useParams} from "react-router-dom";
import {Button, Stack, Typography} from "@mui/material";
import {useGetTodoQuery} from "../api/apiSlice";

const SingleTodo = () => {
    const {id} = useParams();

    const {data: todo} = useGetTodoQuery(id ?? "");

    return <Stack flexDirection={"column"} gap={"1rem"}>
        {todo && <>
            <Typography variant={"body1"}>ID:- {todo.id}</Typography>
            <Typography variant={"body1"}>TITLE:- {todo.title}</Typography>
            <Link to={"/todos"}>Go Back to List</Link>
            <Link to={`/todos/edit/${id}`}>Edit Todo</Link>
        </>}
    </Stack>
}

export default SingleTodo

