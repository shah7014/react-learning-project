import React from "react";
import {
  Avatar,
  Card,
  CardContent,
  CardMedia,
  Stack,
  Typography,
} from "@mui/material";
import { Button } from "./ui";

const FlatMatesList = ({ flatMates, activeFlatMate, onSelectFlatMate }) => {
  if (flatMates.length === 0) {
    return <Typography variant="h6">Plan a meal with falt mate</Typography>;
  }

  return (
    <>
      {flatMates.map(({ name, image, id, amount }) => (
        <Card
          key={id}
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: "1rem",
            alignItems: "center",
            padding: "0 0.5rem",
            backgroundColor: id === activeFlatMate ? "#fff4e6" : "transparent",
            marginBottom: "1rem",
          }}
        >
          <CardMedia>
            <Avatar alt={name} src={image} />
          </CardMedia>
          <CardContent
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              flex: 1,
            }}
          >
            <Stack flexDirection={"column"} gap="0.5rem">
              <Typography variant="body1" fontWeight={"bold"}>
                {name}
              </Typography>
              <Typography variant="body2">
                {amount === 0
                  ? `You and ${name} are even`
                  : amount < 0
                  ? `${name} owes ${Math.abs(amount)}`
                  : `You owe ${name} ${amount}`}
              </Typography>
            </Stack>
            <Button onClick={onSelectFlatMate(id)}>
              {id === activeFlatMate ? "Close" : "Select"}
            </Button>
          </CardContent>
        </Card>
      ))}
    </>
  );
};

export default FlatMatesList;
