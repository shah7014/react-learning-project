import { Clear } from "@mui/icons-material";
import {
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  Grid,
  MenuItem,
  Stack,
} from "@mui/material";
import React, { useState } from "react";
import Input from "./ui/Input";
import Dialog from "./ui/Dialog";

const sortOptions = [
  { label: "Sort by INPUT ORDER", value: "index" },
  { label: "SORT BY ITEM ALPHABETICALLY", value: "description" },
  { label: "SORT BY COMLPETED", value: "completed" },
];

const ItinearyList = ({
  itinearyItems,
  onItemCompleted,
  onItemDelete,
  onDeleteAll,
}) => {
  const [sortBy, setSortBy] = useState("index");

  // dialog
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  let sortedItinearyItems;

  if (sortBy === "index") {
    sortedItinearyItems = itinearyItems;
  }

  if (sortBy === "description") {
    sortedItinearyItems = itinearyItems
      .slice()
      .sort((a, b) => a.item.toLowerCase().localeCompare(b.item.toLowerCase()));
  }

  if (sortBy === "completed") {
    sortedItinearyItems = itinearyItems
      .slice()
      .sort((a, b) => Number(a.isCompleted) - Number(b.isCompleted));
  }

  return (
    <>
      <Container
        maxWidth="md"
        sx={{
          color: "#ffebb3",
          padding: "2rem",
          marginBottom: "3rem",
        }}
      >
        <Stack
          sx={{ flexDirection: { xs: "column", sm: "row" } }}
          justifyContent={"center"}
          gap="2rem"
        >
          <Input
            select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            sx={{ width: { xs: "100%", sm: "300px", md: "350px" } }}
          >
            {sortOptions.map((op) => (
              <MenuItem key={op.value} value={op.value}>
                {op.label.toUpperCase()}
              </MenuItem>
            ))}
          </Input>
          <Button
            sx={{
              backgroundColor: "#ffebb3",
              borderRadius: "100px",
              color: "#000",
              "&:hover": {
                backgroundColor: "red",
              },
              "&:disabled": {
                backgroundColor: "#c1c1c1",
                color: "#000",
              },
            }}
            variant="contained"
            onClick={() => setIsDialogOpen(true)}
            disabled={itinearyItems.length === 0}
          >
            Clear List
          </Button>
        </Stack>
        <Grid
          container
          sx={{
            marginTop: "2rem",
          }}
        >
          {sortedItinearyItems.map((item) => (
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
                      textDecoration: item.isCompleted
                        ? "line-through"
                        : "none",
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
      <Dialog
        open={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onConfirmation={onDeleteAll}
      />
    </>
  );
};

export default ItinearyList;
