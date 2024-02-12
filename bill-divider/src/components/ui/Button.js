import styled from "@emotion/styled";
import { Button as MuiButton } from "@mui/material";

const Button = styled(MuiButton)(({ theme }) => ({
  backgroundColor: "#ffa94d",
  color: "#000",
  fontWeight: "bold",
  textTransform: "none",

  "&:hover": {
    backgroundColor: "#ff922b",
  },
}));

export default Button;
