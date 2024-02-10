import { Clear } from "@mui/icons-material";
import {
  Checkbox,
  Container,
  FormControlLabel,
  Grid,
  Stack,
} from "@mui/material";
import React from "react";

const ItinearyList = ({ itinearyItems, onItemCompleted, onItemDelete }) => {
  return (
    <Container maxWidth="md" sx={{ color: "#ffebb3", padding: "2rem" }}>
      <Grid container>
        {itinearyItems.map((item) => (
          <Grid item xs={12} sm={6} md={3} key={item.index}>
            <Stack flexDirection={"row"} alignItems={"center"}>
              <FormControlLabel
                control={
                  <Checkbox
                    color="secondary"
                    checked={item.isCompleted}
                    onChange={onItemCompleted(item)}
                  />
                }
                label={`${item.amount} ${item.item}`}
                sx={{
                  "& span.MuiFormControlLabel-label ": {
                    textDecoration: item.isCompleted ? "line-through" : "none",
                  },
                }}
              />
              <Clear
                sx={{ color: "red", cursor: "pointer" }}
                onClick={onItemDelete(item)}
              />
            </Stack>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default ItinearyList;
