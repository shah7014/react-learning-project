import styled from "@emotion/styled";
import { Input as MuiInput } from "@mui/material";

const Input = styled(MuiInput)(({ theme, disabled }) => ({
  flex: 1,
  backgroundColor: disabled ? "#e1e1e1" : "#fff",
  color: "#000",
  padding: "0.5rem 1rem",
  "& input": {
    textAlign: "center",
  },
  "&.MuiInputBase-root.MuiInput-root": {
    marginTop: 0,
  },
}));

export default Input;
