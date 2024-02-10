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
  const [sortBy, setSortBy] = useState("index");

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
    const sortedItems = handleSort(sortBy, [...itinearyItems, newItinearyItem]);

    setItienaryItems(sortedItems);
  };

  const handleSort = (sortBy, items) => {
    if (sortBy === "item") {
      return items.sort((i1, i2) => {
        let compare = 0;
        if (i1.item.toUpperCase() > i2.item.toUpperCase()) {
          compare = 1;
        } else if (i1.item.toUpperCase() < i2.item.toUpperCase()) {
          compare = -1;
        }
        return compare;
      });
    } else if (sortBy === "completed") {
      const nonCompletedItems = handleSort(
        "index",
        items.filter((i) => !i.isCompleted)
      );
      const completedItems = handleSort(
        "index",
        items.filter((i) => i.isCompleted)
      );
      return [...nonCompletedItems, ...completedItems];
    } else {
      return items.sort((i1, i2) => i1.index - i2.index);
    }
  };

  const handleItemCompleted = (item) => (event) => {
    const selectedItem = itinearyItems.find((i) => i.index === item.index);
    selectedItem.isCompleted = event.target.checked;

    setItienaryItems((items) =>
      handleSort(sortBy, [
        ...items.filter((i) => i.index !== item.index),
        selectedItem,
      ])
    );
  };

  const handleItemDelete = (toBeDeletedItem) => (e) => {
    setItienaryItems((items) =>
      items.filter((i) => i.index !== toBeDeletedItem.index)
    );
  };

  const handleSortByChange = (e) => {
    setSortBy(e.target.value);
    const sortedItems = handleSort(e.target.value, itinearyItems);
    setItienaryItems(sortedItems);
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
          sortBy={sortBy}
          onChangeSortBy={handleSortByChange}
          onDeleteAll={handleDeleteAll}
        />
        <ItinearyStats items={itinearyItems} />
      </Box>
    </ThemeProvider>
  );
};

export default App;
