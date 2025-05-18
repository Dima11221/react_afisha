import {Movie} from "../Movie/Movie.tsx";
import {IMovie} from "../../types/Types.ts";
import style from './style.module.scss'


interface IMovies {
    movies: IMovie[];
}

const Movies = (props: IMovies) => {
    const { movies = []} = props;

    return (
        <div className={`${style.movieList} `}>
            {movies.length > 0 && (
                movies.map((movie) => (
                    <Movie key={movie.imdbID} {...movie}/>
                ))
            )}

            {!movies.length && (
                <h4>Couldn't find anything, or you entered the name incorrectly.</h4>
            )}
        </div>
    );
}

export { Movies };