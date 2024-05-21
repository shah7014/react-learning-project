import React, {useEffect, useState} from 'react';
import {ThemeProvider, responsiveFontSizes, createTheme, CssBaseline, Container, Grid, Typography} from "@mui/material"
import Navbar from "./components/Navbar";
import {omdbApi} from "./utils/omdbApi";
import {TMovie, TMovieInformation, TMovieResponse, TWatchedMovie} from "./types";
import {MovieBox} from "./components/ui/MovieBox";
import MovieList from "./components/MovieList";
import ActiveMovie from "./components/ActiveMovie";
import MovieStatistics from "./components/MovieStatistics";
import WatchedMovies from "./components/WatchedMovies";
import axios from "axios";

function App() {

    let theme = createTheme({
        palette: {
            background: {
                default: "#212529",
                paper: "#343a40"
            },
            text: {
                primary: "#dee2e6"
            },
            primary: {
                main: "#6741d9",
                light: "#7950f2"
            }
        }
    });

    theme = responsiveFontSizes(theme);

    const [query, setQuery] = useState("");

    // searchedMovies coming from API
    const [movies, setMovies] = useState<TMovie[]>([]);
    const moviesNumber = movies.length;
    const [searchError, setSearchError] = useState("");

    // movie that user has selected to view more information for
    // this will make another API call to get the selected movie details
    const [activeMovie, setActiveMovie] = useState<TMovieInformation | null>(null);
    const [isActiveMovieLoading, setIsActiveMovieLoading] = useState(false);

    // movies that are rated by user, and added to watchList
    const [watchedMovies, setWatchedMovies] = useState<TWatchedMovie[]>([]);

    const handleMovieSelect = (movieId: string) => async () => {
        console.log("ACTIVE:- ", movieId);
        try {
            if (activeMovie?.imdbID === movieId) {
                setActiveMovie(null);
                return;
            }
            setIsActiveMovieLoading(true);
            const response = await omdbApi.get<TMovieInformation>(`?i=${movieId}`);
            setActiveMovie(response.data);
        } catch (err) {
            console.log(err);
        } finally {
            setIsActiveMovieLoading(false);
        }
    }

    const handleRemoveActiveMovie = () => {
        setActiveMovie(null);
    }

    const handleAddToWatchList = (newlyWatchedMovie: TWatchedMovie) => {
        setWatchedMovies(movies => ([...movies, newlyWatchedMovie]))
    }


    useEffect(() => {

        const controller = new AbortController();
        const fetchMovies = async () => {
            try {
                const response = await omdbApi.get<TMovieResponse>(`?s=${query}`, {
                    signal: controller.signal
                });
                if (response.data.Response !== "False") {
                    setMovies(response.data.Search);
                    setSearchError("");
                }
            } catch (err) {
                if (axios.isCancel(err)) {
                    console.log("Request cancelled");
                } else {
                    setSearchError(`Error searching movie with query ${query}`);
                    setMovies([]);
                }

            }
        }
        if (query.length <= 3) {
            setMovies([]);
            setSearchError("");
            return;
        }

        fetchMovies();

        return () => {
            controller.abort();
        }
    }, [query]);

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <Container maxWidth={"xl"}>
                <Navbar
                    query={query}
                    setQuery={setQuery}
                    moviesNumber={moviesNumber}
                />

                <Container maxWidth={"lg"} sx={{marginTop: "1rem"}}>
                    <Grid container spacing={"1rem"}>
                        <Grid item xs={12} md={6}>
                            <MovieBox>
                                {searchError ? <Typography variant={"h6"} sx={{color: "red"}}>
                                        {searchError}
                                    </Typography> :
                                    <MovieList movies={movies} onMovieSelect={handleMovieSelect}/>
                                }
                            </MovieBox>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <MovieBox>
                                {isActiveMovieLoading ? <Typography variant={"h6"}>Loading...</Typography> :
                                    activeMovie ?
                                        <ActiveMovie
                                            activeMovie={activeMovie}
                                            watchedMovies={watchedMovies}
                                            onRemoveActiveMovie={handleRemoveActiveMovie}
                                            onAddToWatchList={handleAddToWatchList}
                                        /> :
                                        <>
                                            <MovieStatistics/>
                                            <WatchedMovies watchedMovies={watchedMovies}/>
                                        </>
                                }
                            </MovieBox>
                        </Grid>
                    </Grid>
                </Container>
            </Container>
        </ThemeProvider>
    );
}

export default App;
