import {AppBar, Stack, Toolbar, Typography} from "@mui/material";
import {Link} from "react-router-dom";

const NavBar = () => {
    return <AppBar position={"sticky"}>
        <Toolbar
            sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                backgroundColor: "orchid",
                padding: "1rem"
            }}
        >
            <Typography variant={"h3"} component={"h1"}>RTK Query</Typography>

            <Stack flexDirection={"row"} gap={"2rem"}>
                <Link to={"/"}>Home</Link>
                <Link to={"/posts/add"}>Post</Link>
                <Link to={"/users"}>Users</Link>
            </Stack>
        </Toolbar>
    </AppBar>
}

export default NavBar;

