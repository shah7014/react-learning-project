import React from "react";
import {Link, useParams} from "react-router-dom";
import {Stack, Typography} from "@mui/material";
import {useGetPostsByUserIdQuery} from "../posts/postsSlice";
import {useGetAllUsersQuery} from "./usersSlice";

const UserPage = () => {

    const {id: userId} = useParams() as {id: string};

    const {user} = useGetAllUsersQuery(undefined, {
        selectFromResult: ({data, isLoading}) => {
            return {
                user: data?.entities[userId]
            }
        }
    });

    const {
        data,
        isLoading,
        isSuccess
    } = useGetPostsByUserIdQuery(userId);


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
            <Typography variant={"h3"}>{user?.name}</Typography>
            {ids.map(id => <Link to={`/posts/${id}`}>{entities[id]?.title}</Link>)}
        </Stack>
    }

    return <section>{content}</section>;
}

export default UserPage;


