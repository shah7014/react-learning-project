import React, {useEffect} from 'react';
import {Box, Button, Container, CssBaseline, Typography} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {getUsers, usersSelector} from "./features/users/userSlice";
import {AppDispatch} from "./store";
import CommentsList from "./features/comments/CommentsList";

function App() {

    const dispatch = useDispatch<AppDispatch>();

    const users = useSelector(usersSelector)

    // useEffect(() => {
    //     dispatch(getUsers())
    // }, [])

    return (
        <>
            <CssBaseline/>

            <Container maxWidth={"lg"}>
                <Typography variant={"h3"} component={"h1"} textAlign={"center"} sx={{margin: "2rem 0"}}>This is sample EntityAdapter RTK </Typography>

                <CommentsList />
            </Container>
            {/*<Box>*/}
            {/*    <Typography variant={"h3"}>Hell World</Typography>*/}
            {/*    {users.length === 0 ? <Typography variant={"h4"}>No Users</Typography> : (users.map(u => (*/}
            {/*        <Button sx={{margin: "1rem"}} key={u.id} variant={"text"}>{u.name}</Button>*/}
            {/*    )))}*/}
            {/*</Box>*/}
        </>
    );
}

export default App;
