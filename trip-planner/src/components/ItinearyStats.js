import { Box, Typography } from "@mui/material";
import React from "react";

const ItinearyStats = ({ items }) => {
  const numItems = items.length;

  const numCompletedItems = items.filter((i) => i.isCompleted).length;

  const completedItemsPercent = Math.round(
    (numCompletedItems / numItems) * 100
  );

  const getStats = () => {
    if (numItems === 0) {
      return "🚢✈ Start Planning your trip now 🧰🚉";
    }
    if (numItems === numCompletedItems) {
      return "🧰 You're all set to go 🚀";
    }
    return `💼 You have ${numItems} items on your list, and you already packed ${numCompletedItems} (${completedItemsPercent}%) for your trip 🚉`;
  };

  return (
    <Box
      sx={{
        padding: "1rem",
        textAlign: "center",
        backgroundColor: "#76c7ad",
        color: "#fff",
      }}
      component={"footer"}
    >
      <Typography variant="body1" sx={{ fontWeight: "bold" }}>
        {getStats()}
      </Typography>
    </Box>
  );
};

export default ItinearyStats;
