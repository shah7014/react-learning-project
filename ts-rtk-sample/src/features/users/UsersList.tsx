import React from "react";
import {useSelector} from "react-redux";
import {usersSelector} from "./usersSlice";
import {Stack, Typography} from "@mui/material";
import {Link} from "react-router-dom";

const UsersList = () => {
    const users = useSelector(usersSelector);

    return <>
        <Typography variant={"h3"}>Users</Typography>
        <Stack
            flexDirection={"column"}
            gap={"1rem"}
            alignItems={"flex-start"}
        >
            {users.map(u => <Typography key={u.id} component={Link} to={`/users/${u.id}`}>{u.name}</Typography>)}
        </Stack>

    </>
}

export default UsersList;

