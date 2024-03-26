import React, {useEffect, useState} from 'react';
import {ThemeProvider, responsiveFontSizes, createTheme, CssBaseline, Container, Grid, Typography} from "@mui/material"
import Navbar from "./components/Navbar";
import {omdbApi} from "./utils/omdbApi";
import {Movie, MovieInformation, MovieResponse} from "./types";
import {MovieBox} from "./components/ui/MovieBox";
import MovieList from "./components/MovieList";
import ActiveMovie from "./components/ActiveMovie";
import MovieStatistics from "./components/MovieStatistics";
import WatchedMovies from "./components/WatchedMovies";

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


    const [movies, setMovies] = useState<Movie[]>([]);
    const moviesNumber = movies.length;
    const [searchError, setSearchError] = useState("");

    const [activeMovie, setActiveMovie] = useState<MovieInformation | null>(null);
    const [isActiveMovieLoading, setIsActiveMovieLoading] = useState(false);

    const [watchedMovies, setWatchedMovies] = useState([]);

    const handleMovieSelect = (movieId: string) => async () => {
        console.log("ACTIVE:- ", movieId);
        try {
            if (activeMovie?.imdbID === movieId) {
                setActiveMovie(null);
                return;
            }
            setIsActiveMovieLoading(true);
            const response = await omdbApi.get<MovieInformation>(`?i=${movieId}`);
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

    const handleAddToWatchList = (movie: MovieInformation) => {
    }

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const response = await omdbApi.get<MovieResponse>(`?s=${query}`);
                if (response.data.Response !== "False") {
                    setMovies(response.data.Search);
                    setSearchError("");
                }
            } catch (err) {
                setSearchError(`Error seraching movie with query ${query}`);
                setMovies([]);
            }
        }
        if (query.length <= 3) {
            setMovies([]);
            setSearchError("");
            return;
        }

        fetchMovies();
    }, [query])

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
                                            <WatchedMovies/>
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
