import styled from "@emotion/styled";
import { Box, Paper, Stack, Typography } from "@mui/material";
import React from "react";
import { average } from "../utils/movieUtils";

const StatisticItem = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  gap: "0.2rem",
}));

const MovieStatistics = ({ watchedMovies }) => {
  const noOfMoviesWatched = watchedMovies.length;

  const avgImdbRating = average(watchedMovies, "imdbRating");
  const avgUserRating = average(watchedMovies, "userRating");
  const avgDuration = 0;
  // const avgDuration = average(watchedMovies, "Runtime");

  return (
    <Paper sx={{ backgroundColor: "#343a40", padding: "1rem" }}>
      <Typography variant="h6" textTransform={"uppercase"} mb={"0.5rem"}>
        movies you watched
      </Typography>
      <Stack flexDirection={"row"} gap={"1rem"} alignItems={"center"}>
        <StatisticItem>
          <Typography variant="subtitle2">#️⃣</Typography>
          <Typography variant="subtitle1">
            {noOfMoviesWatched} movies
          </Typography>
        </StatisticItem>
        <StatisticItem>
          <Typography variant="subtitle2">⭐</Typography>
          <Typography variant="subtitle1">{avgImdbRating}</Typography>
        </StatisticItem>
        <StatisticItem>
          <Typography variant="subtitle2">👤⭐</Typography>
          <Typography variant="subtitle1">{avgUserRating}</Typography>
        </StatisticItem>
        <StatisticItem>
          <Typography variant="subtitle1">⌛</Typography>
          <Typography variant="subtitle1">{avgDuration}</Typography>
        </StatisticItem>
      </Stack>
    </Paper>
  );
};

export default MovieStatistics;
