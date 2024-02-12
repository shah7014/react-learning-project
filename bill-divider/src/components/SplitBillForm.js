import React, { useState } from "react";
import { Input, Surface, FormControl, Button } from "./ui";
import { Box, MenuItem, Stack, TextField, Typography } from "@mui/material";

const SplitBillForm = ({ activeFlatMate, onBillSplit }) => {
  const [totalBill, setTotalBill] = useState("");
  const [myExpense, setMyExpense] = useState("");
  const flateMateExpense = Number(totalBill) - Number(myExpense);

  const [billPayer, setBillPayer] = useState("You");

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (totalBill && myExpense) {
      onBillSplit({ totalBill, myExpense, billPayer });
    }
  };

  return (
    <Surface sx={{ padding: "2rem" }}>
      <Typography
        variant="h5"
        textTransform={"uppercase"}
        fontWeight={"bold"}
        marginBottom={"1.5rem"}
      >
        Split a bill with {activeFlatMate.name}
      </Typography>

      <Box component={"form"} onSubmit={handleFormSubmit}>
        <FormControl>
          <label htmlFor="billValue" style={{ flex: 1 }}>
            💰 Bill Value
          </label>
          <Input
            id="billValue"
            value={totalBill}
            onChange={(e) => setTotalBill(+e.target.value)}
          />
        </FormControl>
        <FormControl>
          <label htmlFor="yourExpense" style={{ flex: 1 }}>
            🕴️ Your Expense
          </label>
          <Input
            id="yourExpense"
            value={myExpense}
            onChange={(e) => setMyExpense(+e.target.value)}
          />
        </FormControl>
        <FormControl>
          <label htmlFor="otherExpense" style={{ flex: 1 }}>
            🧑‍🤝‍🧑 {activeFlatMate.name}'s expense
          </label>
          <Input id="otherExpense" disabled value={flateMateExpense} />
        </FormControl>
        <FormControl>
          <label htmlFor="billPayer" style={{ flex: 1 }}>
            💵 Who is paying the bill
          </label>
          <TextField
            select
            id="billPayer"
            sx={{ flex: 1 }}
            value={billPayer}
            onChange={(e) => setBillPayer(e.target.value)}
          >
            <MenuItem value={"You"}>You</MenuItem>
            <MenuItem value={activeFlatMate.name}>
              {activeFlatMate.name}
            </MenuItem>
          </TextField>
        </FormControl>

        <Stack flexDirection={"row"} justifyContent={"flex-end"}>
          <Button type="submit" sx={{ width: { xs: "100%", sm: "50%" } }}>
            Split Bill
          </Button>
        </Stack>
      </Box>
    </Surface>
  );
};

export default SplitBillForm;
