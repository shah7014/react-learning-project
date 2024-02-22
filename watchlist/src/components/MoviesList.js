import React from "react";
import { CardContent, CardMedia, Typography, styled } from "@mui/material";
import { MovieCard } from "./ui/MovieCard";

const MovieItem = styled(MovieCard)(({ theme }) => ({
  cursor: "pointer",

  "&:hover": {
    backgroundColor: "#343a40",
  },
}));

const MoviesList = ({ movies, onSelect }) => {
  return (
    <>
      {movies.map((movie) => (
        <MovieItem key={movie.imdbID} onClick={onSelect(movie.imdbID)}>
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
            <Typography variant="subtitle1">{movie.Year}</Typography>
          </CardContent>
        </MovieItem>
      ))}
    </>
  );
};

export default MoviesList;
