import {
  Container,
  CssBaseline,
  createTheme,
  ThemeProvider,
  responsiveFontSizes,
  Grid,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import NavBar from "./components/NavBar";
import MoviesList from "./components/MoviesList";
import WatchedMovies from "./components/WatchedMovies";
import { MovieBox } from "./components/ui/MovieBox";
import MovieStatistics from "./components/MovieStatistics";
import { omdbApi } from "./utils/omdbApi";
import ActiveMovie from "./components/ActiveMovie";
import { getFromLocalStorage, saveToLocalStorage } from "./utils/movieUtils";

const App = () => {
  const[query, setQuery] = useState("")

  // movies fetched based on query
  const [movies, setMovies] = useState([]);
  const [searchError, setSearchError] = useState("");

  const [watchedMovies, setWatchedMovies] = useState([]);

  // user selected movie
  const [activeMovie, setActiveMovie] = useState(null);
  const [isActiveMovieLoading, setIsActiveMovieLoading] = useState(false);

  useEffect(() => {
    const watchedMoviesFound = getFromLocalStorage("watched");
    setWatchedMovies(watchedMoviesFound);
  }, []);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await omdbApi.get(`/?s=${query}`);
        if (response.data.Response !== "False") {
          setMovies(response.data.Search);
          setSearchError("");
        }
      } catch (error) {
        setSearchError("Error Fetching searched movies");
        setMovies([]);
      }
    };

    if (query.length < 3) {
      setMovies([]);
      setSearchError("")
      return;
    }

    fetchMovies();
  }, [query]);



  let theme = createTheme({
    palette: {
      background: {
        default: "#212529",
        paper: "#343a40",
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

  const handleSelectMovie = (movieId) => async () => {
    if (movieId === activeMovie?.imdbID) {
      setActiveMovie(null);
      return;
    }
    try {
      setIsActiveMovieLoading(true);
      const response = await omdbApi.get(`/?i=${movieId}`);
      setActiveMovie(response.data);
    } catch (error) {
    } finally {
      setIsActiveMovieLoading(false);
    }
  };

  const handleAddToWatchedList = (movie) => {
    const newWatchedMovies = [...watchedMovies, movie];
    setWatchedMovies((data) => [...data, movie]);
    saveToLocalStorage("watched", newWatchedMovies);
  };

  const handleRemoveFromWatchedList = (movie) => () => {
    setWatchedMovies((data) => data.filter((m) => m.imdbID !== movie.imdbID));
  };

  const handleRemoveActiveMovie = () => {
    setActiveMovie(null);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="xl" sx={{ marginTop: "1rem", marginBottom: "1rem" }}>
        <NavBar moviesNumber={movies.length} query={query} setQuery={setQuery} />
        <Container
          maxWidth="md"
          sx={{
            marginTop: "2.4rem",
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <MovieBox>
                {searchError ? (
                  <Typography variant="h6">{searchError}</Typography>
                ) : (
                  <MoviesList movies={movies} onSelect={handleSelectMovie} />
                )}
              </MovieBox>
            </Grid>
            <Grid item xs={12} md={6}>
              <MovieBox>
                {isActiveMovieLoading ? (
                  <Typography variant="h6">Loading...</Typography>
                  ) : activeMovie ? (
                  <ActiveMovie
                    activeMovie={activeMovie}
                    onAddToWatchList={handleAddToWatchedList}
                    onRemoveActiveMovie={handleRemoveActiveMovie}
                    watchedMovies={watchedMovies}
                  />
                ) : (
                  <>
                    <MovieStatistics watchedMovies={watchedMovies} />
                    <WatchedMovies
                      watchedMovies={watchedMovies}
                      onRemove={handleRemoveFromWatchedList}
                    />
                  </>
                )}
              </MovieBox>
            </Grid>
          </Grid>
        </Container>
      </Container>
    </ThemeProvider>
  );
};

export default App;
