export interface IMovie {
    Title: string,
    Year: string,
    imdbID: string,
    Type: string,
    Poster: string,
}

export interface IMovieDetails extends IMovie {
    Plot?: string;
    imdbRating?: string
    Rated?: string


    Country?: string;
    Runtime?: string;
    Genre?: string;
    Director?: string;
    Actors?: string
    Ratings?: IRating[];
}

export interface IRating {
    Source: string;
    Value: string;
}