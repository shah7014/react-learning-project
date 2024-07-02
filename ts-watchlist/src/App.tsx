import React, {useState} from 'react';
import {Container, createTheme, CssBaseline, Grid, responsiveFontSizes, ThemeProvider, Typography} from "@mui/material"
import Navbar from "./components/Navbar";
import {omdbApi} from "./utils/omdbApi";
import {TMovieInformation, TWatchedMovie} from "./types";
import {MovieBox} from "./components/ui/MovieBox";
import MovieList from "./components/MovieList";
import ActiveMovie from "./components/ActiveMovie";
import MovieStatistics from "./components/MovieStatistics";
import WatchedMovies from "./components/WatchedMovies";
import {useMovies} from "./hooks/useMovies";
import {useLocalStorageState} from "./hooks/useLocalStorageState";

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

    // movie that user has selected to view more information for
    // this will make another API call to get the selected movie details
    const [activeMovie, setActiveMovie] = useState<TMovieInformation | null>(null);
    const [isActiveMovieLoading, setIsActiveMovieLoading] = useState(false);


    // searchedMovies coming from API
    const {movies, searchError} = useMovies(query, setActiveMovie);
    const moviesNumber = movies.length;

    // movies that are rated by user, and added to watchList
    const [watchedMovies, setWatchedMovies] =
        useLocalStorageState<TWatchedMovie[]>([], 'watchedMovies')


    const handleMovieSelect = (movieId: string) => async () => {
        // console.log("ACTIVE:- ", movieId);
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
