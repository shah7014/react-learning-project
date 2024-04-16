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
            <AppBar position={"sticky"}>
                <Toolbar sx={{padding: "1rem"}}>
                    <Typography
                        variant={"h3"}
                        component={"h1"}
                    >SAMPLE</Typography>
                    <Box sx={{margin: "0 2rem"}}>
                        <Button
                            component={Link}
                            to={"/todos"}
                            variant={"text"}
                            sx={{
                                color: "#fff",
                                "&:hover": {cursor: "pointer"}
                            }}
                        >
                            Todos
                        </Button>
                        <Button
                            component={Link}
                            to={"/users"}
                            variant={"text"}
                            sx={{
                                color: "#fff",
                                "&:hover": {cursor: "pointer"}
                            }}
                        >
                            Users
                        </Button>
                    </Box>
                </Toolbar>
            </AppBar>
            <Container
                maxWidth={"lg"}
                sx={{
                    padding: "1.5rem"
                }}
            >
                <Typography
                    variant={"h4"}
                    component={"h2"}
                    textAlign={"center"}
                    m={2}
                >Learning RTK Query</Typography>
                <Routes>
                    <Route path={"/"} element={<h1>Hello</h1>}/>
                    <Route path={"/todos"} element={<TodoOperations/>}/>
                    <Route path={"/todos/:id"} element={<SingleTodo  />}/>
                    <Route path={"/todos/edit/:id"} element={<EditTodo  />}/>

                    <Route path={"/users"} element={<UsersList />}/>
                    <Route path={"/users/:id"} element={<UserPage />}/>
                </Routes>
            </Container>
        </ThemeProvider>
    );
}

export default App;
