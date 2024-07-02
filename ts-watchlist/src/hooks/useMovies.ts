import React, {useEffect, useState} from 'react';
import {TMovie, TMovieInformation, TMovieResponse} from "../types";
import {omdbApi} from "../utils/omdbApi";
import axios from "axios";

export const useMovies = (query: string, setActiveMovie: (a: TMovieInformation | null) => void) => {

    const [movies, setMovies] = useState<TMovie[]>([]);

    const [searchError, setSearchError] = useState("");

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

        setActiveMovie(null);

        fetchMovies();

        return () => {
            controller.abort();
        }


    }, [query, setActiveMovie]);

    return {movies, searchError};

}



