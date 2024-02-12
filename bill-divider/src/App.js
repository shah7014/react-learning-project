import React, { useState } from "react";
import {
  Container,
  CssBaseline,
  Grid,
  ThemeProvider,
  Typography,
  createTheme,
  responsiveFontSizes,
} from "@mui/material";
import FlatMatesList from "./components/FlatMatesList";
import Button from "./components/ui/Button";
import FlatMateForm from "./components/FlatMateForm";
import { Surface } from "./components/ui";
import SplitBillForm from "./components/SplitBillForm";

const App = () => {
  let theme = createTheme();

  theme = responsiveFontSizes(theme);

  const [flatMates, setFlatMates] = useState([]);

  const [activeFlatMateId, setActiveFlatMateId] = useState(null);

  const [isNewFlatMateFormOpen, setIsNewFlatMateOpenForm] = useState(false);

  const handleFormToggle = () => {
    setIsNewFlatMateOpenForm((val) => !val);
  };

  const handleNewFlatMateAdd = (newFlatMate) => {
    setFlatMates((val) => [...val, { ...newFlatMate, amount: 0 }]);
    setIsNewFlatMateOpenForm(false);
  };

  const handleActiveFlatMate = (index) => (e) => {
    if (index === activeFlatMateId) {
      setActiveFlatMateId(null);
      return;
    }
    setActiveFlatMateId(index);
  };

  const handleBillSplit = ({ totalBill, myExpense, billPayer }) => {
    setFlatMates((data) =>
      data.map((val) => {
        const otherPartyExpense = totalBill - myExpense;
        if (val.id === activeFlatMateId) {
          const amount =
            billPayer.toLowerCase() === "user"
              ? -1 * otherPartyExpense
              : myExpense;
          val.amount = val.amount + amount;
        }
        return val;
      })
    );
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="lg" sx={{ marginTop: "2rem", padding: "1rem" }}>
        <Typography variant="h3" component="h1" textAlign={"center"}>
          React Bill Split
        </Typography>

        <Grid
          container
          sx={{ marginTop: "2rem" }}
          gap={"2rem"}
          justifyContent={"space-between"}
        >
          <Grid item xs={12} md={5}>
            <FlatMatesList
              flatMates={flatMates}
              activeFlatMate={activeFlatMateId}
              onSelectFlatMate={handleActiveFlatMate}
            />
            {isNewFlatMateFormOpen ? (
              <FlatMateForm
                onFormClose={handleFormToggle}
                onNewFlatMateAdd={handleNewFlatMateAdd}
              />
            ) : (
              <Button
                sx={{ textAlign: "right", marginTop: "1.5rem" }}
                onClick={handleFormToggle}
              >
                Add FlatMate
              </Button>
            )}
          </Grid>
          <Grid item xs={12} md={5}>
            <SplitBillForm
              flatMates={flatMates}
              activeFlatMateId={activeFlatMateId}
              onBillSplit={handleBillSplit}
              handleActiveFlatMate={handleActiveFlatMate}
            />
          </Grid>
        </Grid>
      </Container>
    </ThemeProvider>
  );
};

export default App;
