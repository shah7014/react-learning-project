import { Clear } from "@mui/icons-material";
import {
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  Grid,
  MenuItem,
  Stack,
  TextField,
} from "@mui/material";
import React from "react";
import Input from "./ui/Input";

const sortOptions = [
  { label: "SORT BY INPUT ORDER", value: "index" },
  { label: "SORT BY ITEM ALPHABETICALLY", value: "item" },
  { label: "SORT BY COMLPETED", value: "completed" },
];

const ItinearyList = ({
  itinearyItems,
  onItemCompleted,
  onItemDelete,
  sortBy,
  onChangeSortBy,
  onDeleteAll,
}) => {
  return (
    <Container
      maxWidth="md"
      sx={{
        color: "#ffebb3",
        padding: "2rem",
        height: {
          xs: "calc(100vh - 120px - 4rem)",
          md: "calc(100vh - 150px - 4rem)",
        },
      }}
    >
      <Stack
        sx={{ flexDirection: { xs: "column", md: "row" } }}
        justifyContent={"center"}
        gap="2rem"
      >
        <Input select value={sortBy} onChange={onChangeSortBy}>
          {sortOptions.map((op) => (
            <MenuItem key={op.value} value={op.value}>
              {op.label}
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
          }}
          variant="contained"
          onClick={onDeleteAll}
        >
          Clear List
        </Button>
      </Stack>
      <Grid
        container
        sx={{
          marginTop: "2rem",
          height: { sx: "400px", sm: "auto" },
          overflowY: "scroll",
        }}
        component={"ul"}
      >
        {itinearyItems.map((item) => (
          <Grid
            item
            xs={12}
            sm={6}
            md={3}
            key={item.index}
            component={"li"}
            sx={{ listStyle: "none" }}
          >
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
