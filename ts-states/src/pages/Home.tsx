import React from "react";
import {Button, Stack, Typography} from "@mui/material";
import {Link as RouterLink} from "react-router-dom";

const Home = () => {

    return <>
        <Typography sx={{textAlign: "center"}} variant={"h3"}>
            This is a sample app
        </Typography>
        <Stack sx={{
            flexDirection: "row",
            alignItems: "center",
            gap: "2rem",
            marginTop: "2rem"
        }}>

            <Button
                variant={"contained"}
                component={RouterLink}
                to={"/posts"}>
                Posts
            </Button>

        </Stack>
    </>
}

export default Home;

