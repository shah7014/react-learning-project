import React, { useState } from "react";
import styled from "@emotion/styled";
import { Box, Button, MenuItem, Typography } from "@mui/material";
import Input from "./ui/Input";

// {amount: 1, item: "", isPacked: false, index: 0}

const Form = styled("form")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
  justifyContent: "center",
  alignItems: "center",
  padding: "1.5rem",

  backgroundColor: "#e5771f",

  [theme.breakpoints.up("md")]: {
    flexDirection: "row",
  },
}));

const ItinearyForm = ({ onNewItinearyAdd }) => {
  const [item, setItem] = useState("");
  const [isItemValid, setIsItemValid] = useState(true);

  const [amount, setAmount] = useState(1);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (item.trim().length === 0) {
      setIsItemValid(false);
    } else {
      onNewItinearyAdd({ amount: amount, item: item });
      setAmount(1);
      setItem("");
      setIsItemValid(true);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Typography variant="body1" sx={{ fontWeight: "bold" }}>
        What do you need for your 🚢🌴🎒?
      </Typography>
      <Input
        select
        value={amount}
        onChange={(e) => setAmount(+e.target.value)}
        sx={{
          width: { xs: "100%", sm: "40%", md: "100px" },
          "& div[role='combobox']": {
            textAlign: "center",
          },
        }}
      >
        {Array.from({ length: 20 }, (_, i) => i + 1).map((x) => (
          <MenuItem key={x} value={x}>
            {x}
          </MenuItem>
        ))}
      </Input>
      <Box
        sx={{
          width: { xs: "100%", sm: "40%" },
          maxWidth: "400px",
        }}
      >
        <Input
          variant="outlined"
          placeholder="item..."
          autoComplete="off"
          value={item}
          onChange={(e) => setItem(e.target.value)}
          error={!isItemValid}
          fullWidth
        />
        {!isItemValid && (
          <Typography variant="subtitle1" color={"red"}>
            Item can't be empty
          </Typography>
        )}
      </Box>
      <Button
        type="submit"
        variant="contained"
        sx={{
          backgroundColor: "#76c7ad",
          color: "#000",
          textTransform: "uppercase",
          borderRadius: "100px",
          "&:hover": { backgroundColor: "green" },
        }}
      >
        ADD
      </Button>
    </Form>
  );
};

export default ItinearyForm;
