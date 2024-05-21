import React from "react";
import {TMovie} from "../types";
import {CardContent, CardMedia, styled, Typography} from "@mui/material";
import {MovieCard} from "./ui/MovieCard";

const MovieItem = styled(MovieCard)(({theme}) => ({
    cursor: "pointer",

    "&:hover": {
        backgroundColor: "#343a40"
    }
}))

interface IProps {
    movies: TMovie[],
    onMovieSelect: (id: string) => () => void
}

const MovieList: React.FC<IProps> = ({movies, onMovieSelect}: IProps) => {

    return <>
        {movies.map(m => <MovieItem
            key={m.imdbID}
            onClick={onMovieSelect(m.imdbID)}
        >
            <CardMedia
                src={m.Poster}
                component={"img"}
                alt={m.Title}
                sx={{width: "40px"}}
            />
            <CardContent>
                <Typography variant={"h6"} sx={{marginBottom: "0.5rem"}}>
                    {m.Title}
                </Typography>
                <Typography variant={"subtitle1"}>{m.Year}</Typography>
            </CardContent>
        </MovieItem>)}
    </>
}

export default MovieList;

