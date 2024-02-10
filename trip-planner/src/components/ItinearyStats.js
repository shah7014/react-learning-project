import { Box, Typography } from "@mui/material";
import React from "react";

const ItinearyStats = ({ items }) => {
  const completedItems = items.filter((i) => i.isCompleted);

  return (
    <Box
      sx={{
        padding: "1rem",
        textAlign: "center",
        backgroundColor: "#76c7ad",
        color: "#fff",
      }}
    >
      <Typography variant="body1" sx={{ fontWeight: "bold" }}>
        {items.length > 0
          ? `💼You have ${
              items.length
            } items on your list, and you already packed ${
              completedItems.length
            }(${(completedItems.length / items.length) * 100}%)`
          : "🚀Start Planning your trip now"}
      </Typography>
    </Box>
  );
};

export default ItinearyStats;
