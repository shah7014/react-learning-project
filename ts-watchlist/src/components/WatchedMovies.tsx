import React from "react";
import {TWatchedMovie} from "../types";
import {MovieCard} from "./ui/MovieCard";
import {CardContent, CardMedia, Stack, Typography} from "@mui/material";

interface IProps {
    watchedMovies: TWatchedMovie[]
}

const WatchedMovies: React.FC<IProps> = ({watchedMovies}: IProps) => {
    return <>
        {watchedMovies.map(movie => (<MovieCard>
            <CardMedia
                src={movie.poster}
                component={"img"}
                alt={movie.title}
                sx={{width: "40px"}}
            />
            <CardContent>
                <Typography variant={"h6"} sx={{marginBottom: "0.5rem"}}>
                    {movie.title}
                </Typography>
                <Stack
                    flexDirection={"row"}
                    justifyContent={"space-between"}
                    gap={"2rem"}
                    alignItems={"center"}
                >
                    <Typography variant={"body1"}>⭐️ {movie.imdbRating}</Typography>
                    <Typography variant={"body1"}>🤩 {movie.userRating}</Typography>
                    <Typography variant={"body1"}>⏳ {movie.runtime} mins</Typography>
                </Stack>
            </CardContent>
        </MovieCard>))}
    </>
}

export default WatchedMovies;

