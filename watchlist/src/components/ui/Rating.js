import React, { useState } from "react";
import { Stack } from "@mui/material";
import { Star, StarBorder } from "@mui/icons-material";

const Rating = ({ maxRating = 10, onChange, style = {} }) => {
  const [selectedRating, setSelectedRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);

  const handleRatingSelection = (i) => {
    setSelectedRating(i);
    onChange(i);
  };

  return (
    <Stack flexDirection={"row"} alignItems={"center"} sx={{ ...style }}>
      {Array.from({ length: maxRating }, (_, i) => i + 1).map((i) =>
        (hoverRating ? hoverRating >= i : selectedRating >= i) ? (
          <Star
            fontSize="medium"
            onMouseEnter={() => setHoverRating(i)}
            onMouseLeave={() => setHoverRating(0)}
            onClick={() => handleRatingSelection(i)}
            key={i}
            sx={{ cursor: "pointer" }}
          />
        ) : (
          <StarBorder
            fontSize="medium"
            onMouseEnter={() => setHoverRating(i)}
            onMouseLeave={() => setHoverRating(0)}
            onClick={() => handleRatingSelection(i)}
            key={i}
            sx={{ cursor: "pointer" }}
          />
        )
      )}
    </Stack>
  );
};

export default Rating;
