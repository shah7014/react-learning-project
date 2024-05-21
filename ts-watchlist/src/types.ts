export type TMovie = {
    Title: string;
    Year: string;
    imdbID: string;
    Poster: string;
}

export type TMovieInformation = {
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


export type TMovieResponse = {
    Search: TMovie[],
    Response?: "True" | "False" | "true" | "false"
}

export type TWatchedMovie = {
    imdbID: string,
    userRating: number,
    imdbRating: number,
    title: string,
    poster: string,
    runtime: number
}