import { combineReducers } from "@reduxjs/toolkit";
import { movieReducer } from "./movieReducer.ts";

const rootReducer = combineReducers({
    movies: movieReducer,
})

export { rootReducer };