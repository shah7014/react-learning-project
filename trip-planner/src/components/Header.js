import React from "react";
import { Houseboat, Luggage } from "@mui/icons-material";
import { Stack, Typography } from "@mui/material";

const Header = () => {
  return (
    <Stack
      sx={{
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: "1rem",
        height: { xs: "120px", md: "150px" },
        backgroundColor: "#f4a226",
      }}
    >
      <Houseboat
        fontSize="large"
        sx={{ display: { xs: "none", md: "block" } }}
      />
      <Typography
        variant="h1"
        sx={{
          fontFamily: "Monoton",
          textTransform: "uppercase",
          textAlign: "center",
        }}
      >
        React gone
      </Typography>
      <Luggage fontSize="large" sx={{ display: { xs: "none", md: "block" } }} />
    </Stack>
  );
};

export default Header;
