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
import ItinearyStats from "./components/ItinearyStats";

const initialItienary = [
  { item: "Combs", amount: 2, isCompleted: false, index: 1 },
  { item: "Bottle", amount: 5, isCompleted: true, index: 2 },
  { item: "Brush", amount: 2, isCompleted: false, index: 3 },
  { item: "Bags", amount: 6, isCompleted: false, index: 4 },
  { item: "Medicines", amount: 3, isCompleted: true, index: 5 },
  { item: "Games", amount: 4, isCompleted: true, index: 6 },
  { item: "Slippers", amount: 1, isCompleted: false, index: 7 },
  { item: "Towels", amount: 4, isCompleted: true, index: 8 },
  { item: "Makeup kit", amount: 1, isCompleted: false, index: 9 },
  { item: "Thermos", amount: 1, isCompleted: true, index: 10 },
];

const App = () => {
  const [itinearyItems, setItienaryItems] = useState(initialItienary);

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
    setItienaryItems((items) =>
      items.map((i) =>
        i.index === item.index ? { ...i, isCompleted: event.target.checked } : i
      )
    );
  };

  const handleItemDelete = (toBeDeletedItem) => (e) => {
    setItienaryItems((items) =>
      items.filter((i) => i.index !== toBeDeletedItem.index)
    );
  };

  const handleDeleteAll = () => {
    setItienaryItems([]);
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
          onDeleteAll={handleDeleteAll}
        />
        <ItinearyStats items={itinearyItems} />
      </Box>
    </ThemeProvider>
  );
};

export default App;
