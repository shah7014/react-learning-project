import React from "react";
import {Link, useParams} from "react-router-dom";
import {useGetTodosByUserIdQuery} from "../todos/todosSlice";
import {Stack, Typography} from "@mui/material";

const UserPage = () => {

    const {id} = useParams();

    const {
        data,
        isLoading,
        isSuccess,
        error
    } = useGetTodosByUserIdQuery(Number(id));

    let content;

    if (isLoading) {
        content = <Typography variant={"h6"}>Loading...</Typography>
    } else if (isSuccess) {
        const {ids, entities} = data;
        content = <Stack
            flexDirection={"column"}
            gap={"1rem"}
            alignSelf={"flex-start"}
        >
            {ids.map(id => <Link to={`/todos/${id}`}>{entities[id]?.title}</Link>)}

        </Stack>
    }

    return <section>{content}</section>;
}

export default UserPage;


