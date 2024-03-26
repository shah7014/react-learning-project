import React from "react";
import {Box, styled} from "@mui/material";

export const MovieBox = styled(Box)(({theme}) => ({
    borderRadius: theme.shape.borderRadius * 2,
    backgroundColor: "#2b3035",
    height: "600px",
    overflow: "auto"
}))

