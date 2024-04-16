import React from 'react';
import {
    AppBar, Box, Button,
    Container,
    createTheme,
    CssBaseline,
    responsiveFontSizes,
    ThemeProvider, Toolbar,
    Typography
} from "@mui/material";
import TodoOperations from "./features/todos/TodoOperations";
import {Route, Routes, Link} from "react-router-dom";
import SingleTodo from "./features/todos/SingleTodo";
import EditTodo from "./features/todos/EditTodo";
import UsersList from "./features/users/UsersList";
import UserPage from "./features/users/UserPage";
import NavBar from "./components/NavBar";
import PostsList from "./features/posts/PostsList";
import SinglePostPage from "./features/posts/SinglePostPage";

const App = () => {

    let theme = createTheme({
        palette: {
            background: {
                paper: "#F5F5F5"
            }
        }
    });

    theme = responsiveFontSizes(theme);

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <NavBar />
            <Container
                maxWidth={"md"}
                sx={{
                    padding: "1.5rem"
                }}
            >
                <Routes>
                    <Route path={"/todos"} element={<TodoOperations/>}/>
                    <Route path={"/todos/:id"} element={<SingleTodo  />}/>
                    <Route path={"/todos/edit/:id"} element={<EditTodo  />}/>

                    <Route path={"/users"} element={<UsersList />}/>
                    <Route path={"/users/:id"} element={<UserPage />}/>

                    <Route path={"/"} element={<PostsList />}/>
                    <Route path={"/posts"} element={<PostsList/>}/>
                    <Route path={"/posts/:id"} element={<SinglePostPage  />}/>
                    <Route path={"/posts/edit/:id"} element={<EditTodo  />}/>
                </Routes>
            </Container>
        </ThemeProvider>
    );
}

export default App;
