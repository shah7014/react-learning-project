import React from "react";
import {
  AppBar,
  Avatar,
  Badge,
  InputBase,
  Stack,
  Toolbar,
  Typography,
  styled,
} from "@mui/material";
import { AcUnit, Alarm, Mail, Search } from "@mui/icons-material";

const StyledToolBar = styled(Toolbar)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
}));

const StyledSearch = styled(Stack)(({ theme }) => ({
  flexDirection: "row",
  gap: "8px",
  alignItems: "center",
  padding: "0 8px",
  borderRadius: 2 * +theme.shape.borderRadius,
  backgroundColor: "white",
  width: "70%",
  [theme.breakpoints.up("md")]: {
    width: "40%",
  },
}));

const Navbar = () => {
  return (
    <AppBar position="sticky">
      <StyledToolBar>
        {/* Left Side either icon or title based on screen size */}
        <AcUnit
          fontSize="large"
          sx={{ display: { xs: "block", md: "none" } }}
        />
        <Typography variant="h6" sx={{ display: { xs: "none", md: "block" } }}>
          SAMPLE
        </Typography>

        {/* Search Bar */}
        <StyledSearch>
          <Search sx={{ color: "black" }} />
          <InputBase sx={{ outline: "none" }} placeholder="Search..." />
        </StyledSearch>

        {/* Icons */}
        <Stack
          direction={"row"}
          spacing={2}
          alignItems={"center"}
          sx={{ display: { xs: "none", md: "flex" } }}
        >
          <Badge badgeContent={4} color="error">
            <Mail sx={{ color: "white" }} />
          </Badge>
          <Badge badgeContent={4} color="error">
            <Alarm sx={{ color: "white" }} />
          </Badge>
          <Avatar sx={{ backgroundColor: "orchid" }}>R</Avatar>
        </Stack>

        <Avatar
          sx={{
            backgroundColor: "orchid",
            display: { xs: "flex", md: "none" },
          }}
        >
          R
        </Avatar>
      </StyledToolBar>
    </AppBar>
  );
};

export default Navbar;
