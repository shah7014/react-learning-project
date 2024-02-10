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
import ItinearyList from "./components/ItinearyList";

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
    const newItinearyItem = {
      ...data,
      isCompleted: false,
      index: itinearyItems.length + 1,
    };

    setItienaryItems((items) => [...items, newItinearyItem]);
  };

  const handleItemCompleted = (item) => (event) => {
    const selectedItem = itinearyItems.find((i) => i.index === item.index);
    selectedItem.isCompleted = event.target.checked;

    setItienaryItems((items) => [
      ...items.filter((i) => i.index !== item.index),
      selectedItem,
    ]);
  };

  const handleItemDelete = (toBeDeletedItem) => (e) => {
    setItienaryItems((items) =>
      items.filter((i) => i.index !== toBeDeletedItem.index)
    );
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box>
        <Header />
        <ItinearyForm onNewItinearyAdd={handleNewItineary} />
        <ItinearyList
          itinearyItems={itinearyItems}
          onItemCompleted={handleItemCompleted}
          onItemDelete={handleItemDelete}
        />
      </Box>
    </ThemeProvider>
  );
};

export default App;
