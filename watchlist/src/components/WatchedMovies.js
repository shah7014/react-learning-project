import React from "react";
import { MovieBox } from "./ui/MovieBox";
import { MovieCard } from "./ui/MovieCard";
import {
  CardContent,
  CardMedia,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import MovieStatistics from "./MovieStatistics";

const WatchedMovies = ({ watchedMovies }) => {
  return (
    <MovieBox>
      <MovieStatistics watchedMovies={watchedMovies} />
      {watchedMovies.map((movie) => (
        <MovieCard>
          <CardMedia
            component={"img"}
            image={movie.Poster}
            alt={movie.Title}
            sx={{ width: "40px" }}
          />
          <CardContent>
            <Typography variant="h6" sx={{ marginBottom: "0.5rem" }}>
              {movie.Title}
            </Typography>
            <Stack
              flexDirection={"row"}
              justifyContent={"space-between"}
              alignItems={"center"}
              gap="1rem"
            >
              <Typography variant="subtitle1">⭐ {movie.imdbRating}</Typography>
              <Typography variant="subtitle1">
                👤⭐ {movie.userRating}
              </Typography>
              <Typography variant="subtitle1">⌛ {movie.runtime}</Typography>
              <IconButton>
                <Close sx={{ color: "red" }} />
              </IconButton>
            </Stack>
          </CardContent>
        </MovieCard>
      ))}
    </MovieBox>
  );
};

export default WatchedMovies;
