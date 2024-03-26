export type Movie = {
    Title: string;
    Year: string;
    imdbID: string;
    Poster: string;
}

export type MovieInformation = {
    Title: string,
    Year: string,
    Runtime?: string,
    Director: string,
    Actors: string,
    Plot: string,
    Poster: string,
    Metascore?: number,
    imdbRating?: number,
    imdbVotes?: number,
    imdbID: string,
    userRating? : number
}


export type MovieResponse = {
    Search: Movie[],
    Response?: "True" | "False" | "true" | "false"
}