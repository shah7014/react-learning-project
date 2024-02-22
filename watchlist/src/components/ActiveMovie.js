import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import Rating from "./ui/Rating";

const ActiveMovie = ({
  activeMovie,
  onAddToWatchList,
  onRemoveActiveMovie,
  watchedMovies,
}) => {
  const [userRating, setUserRating] = useState(0);

  const correspondingWatchedMovie = watchedMovies.find(
    (m) => m.imdbID === activeMovie.imdbID
  );

  const handleAddToWatchList = () => {
    const movie = {
      ...activeMovie,
      userRating: userRating,
    };
    onAddToWatchList(movie);
    onRemoveActiveMovie();
  };

  return (
    <Box>
      {/* Movie Poster + Title + Rating */}
      <Card
        sx={{
          display: "flex",
          flexDirection: "row",
          backgroundColor: "transparent",
        }}
      >
        <CardMedia
          component="img"
          image={activeMovie.Poster}
          alt={activeMovie.Title}
          sx={{ flex: 1 }}
        />
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            flex: 3,
          }}
        >
          <Typography variant="h6">{activeMovie.Title}</Typography>
          <Typography variant="body1">
            🌟 IMDb Rating {activeMovie.imdbRating}
          </Typography>
        </CardContent>
      </Card>

      {/* Rating and add to watch list */}
      <Paper sx={{ margin: "2rem 1rem", padding: "2rem" }}>
        <Stack
          flexDirection={"column"}
          justifyContent={"space-between"}
          alignItems={"stretch"}
          gap="2rem"
        >
          {correspondingWatchedMovie ? (
            <Typography variant="body1">
              You rated this movie 🌟 {correspondingWatchedMovie.userRating}
            </Typography>
          ) : (
            <>
              <Rating
                onChange={setUserRating}
                style={{ alignSelf: "Center" }}
              />
              {userRating > 0 && (
                <Button variant="contained" onClick={handleAddToWatchList}>
                  + Add to List
                </Button>
              )}
            </>
          )}
        </Stack>
      </Paper>

      {/* Actor, director */}
      <Box sx={{ margin: "3rem 1rem" }}>
        <Typography variant="body1" sx={{ marginBottom: "2rem" }}>
          Starring: {activeMovie.Actors}
        </Typography>
        <Typography variant="body1">
          DirectedBy: {activeMovie.Director}
        </Typography>
      </Box>

      <Button
        sx={{ margin: "1rem", color: "red" }}
        onClick={onRemoveActiveMovie}
      >
        Close
      </Button>
    </Box>
  );
};

export default ActiveMovie;
