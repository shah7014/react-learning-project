import {
  Box,
  CssBaseline,
  ThemeProvider,
  createTheme,
  responsiveFontSizes,
} from "@mui/material";
import React, { useState } from "react";
import Header from "./components/Header";
import ItinearyForm from "./components/ItinearyForm";

const App = () => {
  const [itinearyItems, setItienaryItems] = useState([]);

  let theme = createTheme({
    palette: {
      background: {
        default: "#5a3e2b",
      },
    },
  });

  theme = responsiveFontSizes(theme);

  const handleNewItineary = (data) => {
    console.log(data);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box>
        <Header />
        <ItinearyForm onNewItinearyAdd={handleNewItineary} />
      </Box>
    </ThemeProvider>
  );
};

export default App;
