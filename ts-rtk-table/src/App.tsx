import React from 'react';
import {
    AppBar,
    Container,
    createTheme,
    CssBaseline,
    responsiveFontSizes,
    styled,
    ThemeProvider,
    Toolbar
} from "@mui/material";
import {Link, Route, Routes} from "react-router-dom";
import PostList from "./features/posts/PostList";
import SinglePost from "./features/posts/SinglePost";
import UserList from "./features/users/UserList";
import SingleUser from "./features/users/SingleUser";
import NewPost from "./features/posts/NewPost";
import EditPost from "./features/posts/EditPost";
import CityTable from "./features/city/CityTable";

const StyledLink = styled(Link)({
    color: "#fff"
})

const App = () => {
    let theme = createTheme({
        palette: {
            mode: "light",
            background: {
                default: "#f1f1f1"
            }
        }
    });

    theme = responsiveFontSizes(theme);

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <AppBar position={"sticky"}>
                <Toolbar
                    sx={{
                        display: "flex",
                        flexDirection: "row",
                        gap: "2rem",
                    }}
                >
                    <StyledLink to={"/posts"}>Posts</StyledLink>
                    <StyledLink to={"/users"}>Users</StyledLink>
                    <StyledLink to={"/cities"}>Cities</StyledLink>
                </Toolbar>
            </AppBar>
            <Container
                maxWidth={"lg"}
                sx={{padding: "2rem"}}
            >
                <Routes>
                    <Route path={"/"} element={<PostList/>}/>
                    <Route path={"/posts"} element={<PostList/>}/>
                    <Route path={"/posts/:id"} element={<SinglePost/>}/>
                    <Route path={"/posts/create"} element={<NewPost/>}/>
                    <Route path={"/posts/edit/:id"} element={<EditPost/>}/>
                    <Route path={"/users"} element={<UserList/>}/>
                    <Route path={"/users/:id"} element={<SingleUser/>}/>
                    <Route path={"/cities"} element={<CityTable/>}/>
                </Routes>
            </Container>
        </ThemeProvider>
    );
}

export default App;
