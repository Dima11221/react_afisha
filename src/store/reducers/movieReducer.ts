import { createSlice } from '@reduxjs/toolkit';
import { IMovie } from "../../types/Types.ts";
import { IMovieDetails } from "../../types/Types.ts";
import {fetchMovieDetails, fetchMovies} from "./thunk.ts";

interface MovieState {
    movies: IMovie[];
    movieDetails: Record<string, IMovieDetails | null>;
    loading: boolean;
    error: string | null;
    totalResults: number;
}

const initialState: MovieState = {
    movies: [],
    movieDetails: {},
    loading: false,
    error: null,
    totalResults: 0,

};


const movieSlice = createSlice({
    name: 'movies',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
            builder
                .addCase(fetchMovies.pending, (state) => {
                    state.loading = true;
                    state.error = null;
                })

                .addCase(fetchMovies.fulfilled, (state, action) => {
                    state.loading = false;
                    state.totalResults = action.payload.totalResults;

                    if (action.payload.append) {
                        state.movies = [...state.movies, ...action.payload.movies];
                    } else {
                        state.movies = action.payload.movies;
                    }

                })
                .addCase(fetchMovies.rejected, (state, action) => {
                    state.loading = false;
                    state.movies = [];
                    state.totalResults = 0;
                    state.error = action.payload as string;
                })

            builder
                .addCase(fetchMovieDetails.pending, (state) => {
                    state.error = null
                })
                .addCase(fetchMovieDetails.fulfilled, (state, action) => {
                    state.movieDetails[action.payload.id] = action.payload.details;
                })
                .addCase(fetchMovieDetails.rejected, (state, action) => {
                    state.error = action.payload as string
                })

        },

});



export const movieReducer = movieSlice.reducer;