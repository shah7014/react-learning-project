import React from 'react';
import {createTheme, ThemeProvider, responsiveFontSizes, CssBaseline, Typography, Container} from "@mui/material";
import {Route, Routes} from "react-router-dom";
import PostsList from "./pages/PostsList";
import PostsDetail from "./pages/PostDetail";
import Home from "./pages/Home";
import Loader from "./components/Loader";
import Notification from "./components/Notification";


function App() {

    let theme = createTheme({
        palette: {
            background: {default: "#E5E4E2"}
        }
    })

    theme = responsiveFontSizes(theme);

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Container maxWidth={"lg"} sx={{marginTop: "2rem"}}>
                <Loader />
                <Notification />
                <Routes>
                    <Route path={"/"} element={<Home />}/>
                    <Route path={"/posts"} element={<PostsList/>} />
                    <Route path={"/posts/:id"} element={<PostsDetail/>} />
                </Routes>
            </Container>
        </ThemeProvider>
    );
}

export default App;
