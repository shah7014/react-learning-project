import React from 'react';
import {Box, Container, CssBaseline, Stack, Typography} from "@mui/material";
import Counter from "./features/counter/Counter";
import PostsList from "./features/posts/PostsList";
import NewPostForm from "./features/posts/NewPostForm";
import {Link, Route, Routes} from "react-router-dom";
import SinglePost from "./features/posts/SinglePost";
import EditPostForm from "./features/posts/EditPostForm";
import UsersList from "./features/users/UsersList";
import UserPage from "./features/users/UserPage";


function App() {


    return (
        <>
            <CssBaseline/>
            <Container maxWidth={"lg"}>
                <Typography variant={"h3"} textAlign="center">This is a sample RTK app</Typography>
                <Box sx={{marginTop: "2rem"}}>
                    {/*<Counter />*/}
                    {/*<NewPostForm />*/}
                    {/*<PostsList />*/}
                    <Stack flexDirection={"row"} gap={"2rem"}>
                        <Link to={"/users"}>Users</Link>
                        <Link to={"/"}>Start</Link>
                    </Stack>

                    <Counter />

                    <Routes>
                        <Route path={"/"} element={<PostsList />} />
                        <Route path={"/posts/:id"} element={<SinglePost />} />
                        <Route path={"/posts/add"} element={<NewPostForm />} />
                        <Route path={"/posts/edit/:id"} element={<EditPostForm />} />
                        <Route path={"/users"} element={<UsersList />} />
                        <Route path={"/users/:id"} element={<UserPage />} />
                    </Routes>
                </Box>
            </Container>
        </>
    );
}

export default App;
