import { FormControl as MuiFormControl, styled } from "@mui/material";

const FormControl = styled(MuiFormControl)(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  gap: "1rem",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "1.5rem",
}));

export default FormControl;
