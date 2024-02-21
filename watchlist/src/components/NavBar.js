import {
  AppBar,
  Toolbar,
  Typography,
  styled,
  Input as MuiInput,
} from "@mui/material";
import React from "react";

const Input = styled(MuiInput)(({ theme }) => ({
  borderRadius: "0.7rem",
  color: theme.palette.text.primary,
  backgroundColor: theme.palette.primary.light,
  padding: "0.5rem 1.6rem",

  width: "100%",
  [theme.breakpoints.up("md")]: {
    width: "40%",
  },
}));

const NavBar = ({ moviesNumber = 0 }) => {
  return (
    <AppBar
      position="sticky"
      sx={{
        borderRadius: "0.9rem",
        backgroundColor: "#6741d9",
      }}
    >
      <Toolbar
        sx={{
          justifyContent: "space-between",
          alignItems: "center",
          paddingY: "1rem",
        }}
      >
        <Typography
          variant="h4"
          component={"h1"}
          color={"#fff"}
          sx={{ display: { xs: "none", md: "block" } }}
        >
          🍿 watchList
        </Typography>

        <Input placeholder="Search..." disableUnderline />

        <Typography
          variant="body1"
          sx={{ display: { xs: "none", md: "block" } }}
        >
          Found {moviesNumber} results
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
