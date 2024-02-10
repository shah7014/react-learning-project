import { styled, TextField } from "@mui/material";

export default styled(TextField)(({ theme }) => ({
  backgroundColor: "#ffebb3",
  borderRadius: "100px",
  outline: "none",
  "& fieldset": {
    border: "none",
  },
}));
