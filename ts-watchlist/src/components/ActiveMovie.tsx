import React, {useEffect, useState} from "react";
import {TMovieInformation, TWatchedMovie} from "../types";
import {Box, Button, Card, CardContent, CardMedia, Paper, Stack, Typography} from "@mui/material";
import StarRating from "./ui/StarRating";

interface IProps {
    activeMovie: TMovieInformation,
    onRemoveActiveMovie: () => void,
    onAddToWatchList: (m: TWatchedMovie) => void,
    watchedMovies: TWatchedMovie[]
}


const ActiveMovie: React.FC<IProps> = ({activeMovie, onRemoveActiveMovie, onAddToWatchList, watchedMovies}: IProps) => {

    const correspondingWatchedMovie = watchedMovies.find(m => m.imdbID === activeMovie.imdbID);

    const [userRating, setUserRating] = useState<number>(0);

    useEffect(() => {
        if (activeMovie) {
            document.title = `Movie | ${activeMovie.Title}`
        }

    //     after unmounting of component when activeMovie is set to null we want to revert back to original title

        return () => {
            document.title = 'Movie List'
        }
    }, [activeMovie])



// addEventListener for listening to 'backspace' key
    useEffect(() => {

        const listener = (evt: any) => {
            if (evt.code.toLowerCase() === 'backspace') {
                    onRemoveActiveMovie();
                    // console.log("CLOSING")
                }
            };

        document.addEventListener("keydown", listener)

        return () => {
            document.removeEventListener("keydown", listener)
        }
    }, [onRemoveActiveMovie])

    const handleAddToWatchList = () => {
        const movie: TWatchedMovie = {
            imdbID: activeMovie.imdbID,
            poster: activeMovie.Poster,
            imdbRating: Number(activeMovie.imdbRating),
            runtime: Number(activeMovie.Runtime?.split(" ")[0]),
            title: activeMovie.Title,
            userRating: userRating
        }
        onAddToWatchList(movie);
        onRemoveActiveMovie();
    }

    return <Box>
        {/*Movie Poster + Movie Title*/}
        <Card sx={{display: "flex", flexDirection: "row"}}>
            <CardMedia
                component={"img"}
                src={activeMovie.Poster}
                alt={activeMovie.Title}
                sx={{flex: 1}}
            />
            <CardContent
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "1rem",
                    flex: 3
                }}
            >
                <Typography variant={"h6"}>{activeMovie.Title}</Typography>
                <Typography variant={"body1"}>
                    ⭐️ IMDB Rating {activeMovie.imdbRating}
                </Typography>
            </CardContent>
        </Card>

        {/*    User Rating*/}
        <Paper sx={{margin: "2rem 1rem", padding: "2rem"}}>
            <Stack flexDirection={"column"}
                   justifyContent={"space-between"}
            >
                {/*if movie already rated, then don't allow to add again*/}
                {Boolean(correspondingWatchedMovie) ? (
                    <Typography variant={"body1"}>
                        You rated this movie 🌟 {correspondingWatchedMovie?.userRating}
                    </Typography>
                ) : (
                    <>
                        <StarRating maxRating={10} onChange={setUserRating}/>
                        {userRating > 0 && (
                            <Button variant={"contained"} onClick={handleAddToWatchList}>
                                + Add to list
                            </Button>
                        )}
                    </>

                )

                }
            </Stack>
        </Paper>

        {/*    Actor, Director, plot*/}
        <Stack
            sx={{
                flexDirection: 'column',
                gap: "2rem",
            }}
        >
            <Typography variant={"body1"} sx={{fontStyle: "iatlic"}}>{activeMovie.Plot}</Typography>
            <Typography variant={"body1"}>Starring: {activeMovie.Actors}</Typography>
            <Typography variant={"body1"}>DirectedBy: {activeMovie.Director}</Typography>
        </Stack>

        <Button
            sx={{color: "red"}}
            onClick={onRemoveActiveMovie}
        >
            Close
        </Button>
    </Box>
}

export default ActiveMovie;

