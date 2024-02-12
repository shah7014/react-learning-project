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
  const activeFlatMate = flatMates?.find(
    (mate) => mate.id === activeFlatMateId
  );

  const [isNewFlatMateFormOpen, setIsNewFlatMateOpenForm] = useState(false);

  const handleFormToggle = () => {
    setIsNewFlatMateOpenForm((val) => !val);
  };

  const handleNewFlatMateAdd = (newFlatMate) => {
    const initlaNumber = flatMates.length;
    setFlatMates((val) => [
      ...val,
      { ...newFlatMate, id: initlaNumber + 1, amount: 0 },
    ]);
  };

  const handleActiveFlatMate = (index) => (e) => {
    if (index === activeFlatMateId) {
      setActiveFlatMateId(null);
      return;
    }
    setActiveFlatMateId(index);
  };

  const handleBillSplit = ({ totalBill, myExpense, billPayer }) => {
    console.log({ totalBill, myExpense, billPayer });

    setFlatMates((data) =>
      data.map((val) => {
        const otherPartyExpense = totalBill - myExpense;
        if (val.id === activeFlatMateId) {
          const amount =
            billPayer.toLowerCase() === "you"
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
            {activeFlatMate && (
              <SplitBillForm
                activeFlatMate={activeFlatMate}
                onBillSplit={handleBillSplit}
              />
            )}
          </Grid>
        </Grid>
      </Container>
    </ThemeProvider>
  );
};

export default App;
