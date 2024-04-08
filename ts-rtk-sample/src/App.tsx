import React from 'react';
import {Box, Container, CssBaseline, Typography} from "@mui/material";
import Counter from "./features/counter/Counter";
import PostsList from "./features/posts/PostsList";
import NewPostForm from "./features/posts/NewPostForm";
import {Route, Routes} from "react-router-dom";
import SinglePost from "./features/posts/SinglePost";
import EditPostForm from "./features/posts/EditPostForm";


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
                    <Routes>
                        <Route path={"/"} element={<PostsList />} />
                        <Route path={"/posts/:id"} element={<SinglePost />} />
                        <Route path={"/posts/add"} element={<NewPostForm />} />
                        <Route path={"/posts/edit/:id"} element={<EditPostForm />} />
                    </Routes>
                </Box>
            </Container>
        </>
    );
}

export default App;
