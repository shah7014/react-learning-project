import React from "react";
import {AppBar, Stack, Toolbar, Typography, Input as MuiInput, styled, Button, Box} from "@mui/material";

interface IProps {
    moviesNumber: number;
    query: string;
    setQuery: (q: string) => void
}


const Input = styled(MuiInput)(({theme}) => ({
    padding: "0.5rem 1rem",
    outline: "none",
    backgroundColor: theme.palette.primary.light,
    borderRadius: theme.shape.borderRadius * 2,
    color: theme.palette.text.primary,
    width: "100%",
    [theme.breakpoints.up("md")]: {
        width: "40%"
    }
}))

const Navbar: React.FC<IProps> = ({query, setQuery, moviesNumber = 0}: IProps) => {

    const queryChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value);
    }

    return <AppBar position={"static"} sx={{
        marginTop: "1rem",
        borderRadius: theme => theme.shape.borderRadius,
        backgroundColor: "#6741d9"
    }}>
        <Toolbar sx={{
            justifyContent: "space-between",
            alignItems: "center",
            paddingY: "1rem"
        }}>

            {/*    title*/}
            <Typography
                variant={"h4"}
                component={"h1"}
                sx={{display: {xs: "none", md: "block"}}}
            >
                🍿 ts-watchList
            </Typography>


            {/*    Input*/}

            <Input
                disableUnderline
                placeholder={"Search..."}
                value={query}
                onChange={queryChangeHandler}
            />

            {/*Movies Number*/}

            <Typography variant={"body1"}
                        sx={{
                            display: {xs: "none", md: "block"}
                        }}
            >
                Found {moviesNumber} results
            </Typography>
        </Toolbar>
    </AppBar>
}

export default Navbar;
