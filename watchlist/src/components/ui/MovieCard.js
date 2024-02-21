import { Card, styled } from "@mui/material";

export const MovieCard = styled(Card)(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  gap: "1.25rem",
  backgroundColor: "transparent",
  padding: "1rem",
}));
