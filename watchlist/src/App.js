import {
  Container,
  CssBaseline,
  createTheme,
  ThemeProvider,
  responsiveFontSizes,
  Grid,
} from "@mui/material";
import React, { useState } from "react";
import NavBar from "./components/NavBar";
import Movies from "./components/Movies";
import WatchedMovies from "./components/WatchedMovies";

const tempMovieData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
  },
  {
    imdbID: "tt0133093",
    Title: "The Matrix",
    Year: "1999",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
  },
  {
    imdbID: "tt6751668",
    Title: "Parasite",
    Year: "2019",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
  },
];

const tempWatchedData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
    runtime: 148,
    imdbRating: 8.8,
    userRating: 10,
  },
  {
    imdbID: "tt0088763",
    Title: "Back to the Future",
    Year: "1985",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
    runtime: 116,
    imdbRating: 8.5,
    userRating: 9,
  },
];

const App = () => {
  const [movies, setMovies] = useState(tempMovieData);
  const [watchedMovies, setWatchedMovies] = useState(tempWatchedData);

  let theme = createTheme({
    palette: {
      background: {
        default: "#212529",
      },
      text: {
        primary: "#dee2e6",
      },
      primary: {
        main: "#6741d9",
        light: "#7950f2",
      },
    },
  });

  theme = responsiveFontSizes(theme);

  const handleDelete = () => {};

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="xl" sx={{ marginTop: "1rem", marginBottom: "1rem" }}>
        <NavBar moviesNumber={movies.length} />
        <Container
          maxWidth="md"
          sx={{
            marginTop: "2.4rem",
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Movies movies={movies} />
            </Grid>
            <Grid item xs={12} md={6}>
              <WatchedMovies watchedMovies={watchedMovies} />
            </Grid>
          </Grid>
        </Container>
      </Container>
    </ThemeProvider>
  );
};

export default App;
