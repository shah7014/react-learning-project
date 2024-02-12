import React, { useState } from "react";
import Surface from "./ui/Surface";
import { Box, Stack } from "@mui/material";

import { Button, FormControl, Input } from "./ui";

const FlatMateForm = ({ onFormClose, onNewFlatMateAdd }) => {
  const [name, setName] = useState("");
  const [image, setImage] = useState("https://i.pravatar.cc/48");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name === "") {
      return;
    }
    const id = crypto.randomUUID();
    onNewFlatMateAdd({ name, image: `${image}?u=${id}`, id });
    setName("");
    setImage("https://i.pravatar.cc/48");
  };

  return (
    <>
      <Surface sx={{ padding: "1rem", marginTop: "2rem" }}>
        <Box component={"form"} onSubmit={handleSubmit}>
          <FormControl>
            <label htmlFor="flatMateName" style={{ flex: 1 }}>
              🏛️ FlatMate Name
            </label>
            <Input
              id="flatMateName"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </FormControl>

          <FormControl>
            <label htmlFor="flatMateImage" style={{ flex: 1 }}>
              🖼️ Image URL
            </label>
            <Input
              id="flatMateImage"
              value={image}
              onChange={(e) => setImage(e.target.value)}
            />
          </FormControl>

          <Stack flexDirection={"row"} justifyContent={"flex-end"}>
            <Button type="submit" sx={{ width: { xs: "100%", sm: "50%" } }}>
              Add
            </Button>
          </Stack>
        </Box>
      </Surface>
      <Stack
        sx={{ marginTop: "1rem" }}
        flexDirection={"row"}
        justifyContent={"flex-end"}
      >
        <Button onClick={onFormClose}>Close</Button>
      </Stack>
    </>
  );
};

export default FlatMateForm;
