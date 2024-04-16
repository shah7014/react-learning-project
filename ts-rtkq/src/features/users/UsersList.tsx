import React from "react";
import {useSelector} from "react-redux";
import {selectAllUsers} from "./usersSlice";
import {Stack} from "@mui/material";
import {Link} from "react-router-dom";

const UsersList = () => {
    const users = useSelector(selectAllUsers);

    return <Stack
        flexDirection={"column"}
        gap={"1rem"}
        alignItems={"flex-start"}
    >
        {users.map(u => <Link to={`/users/${u.id}`} key={u.id}>{u.name}</Link>)}
    </Stack>
}

export default UsersList;

