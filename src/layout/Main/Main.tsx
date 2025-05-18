import {useEffect, useState} from 'react';
import { Movies } from '../../components/Movies/Movies.tsx';
import { Search } from '../../components/Search/Search.tsx';
import {Preloader} from "../../components/Preloader/Preloader.tsx";
import {fetchMovies} from "../../store/reducers/thunk.ts";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../store/store.ts";
import style from './style.module.scss'
import {Pages} from "../../components/Pages/Pages.tsx";

interface IFilter {
    query: string;
    type: 'all' | 'movie' | 'series' | 'game';
}

const getMovieSelector = ((state: RootState) => state.movies);

const Main = () => {
    const {movies, loading, totalResults} = useSelector(getMovieSelector);
    const [type, setType] = useState<IFilter['type']>("all");
    const [query, setQuery] = useState<string>("movie");
    const [page, setPage] = useState<number>(1);

    const dispatch = useDispatch<AppDispatch>();


    const searchMovies = ({query, type}:IFilter) => {
        setQuery(query)
        setType(type);
        setPage(1);
        dispatch(fetchMovies({query, type, page: 1, append: false} ))
    }


    useEffect(() => {
        dispatch(fetchMovies({query, type, page, append: page > 1
    }))
    }, [query, type, page, dispatch]);



    return (
        <main className={style.mainWrapper}>
            <div>
                <Search searchMovies={searchMovies} type={type} query={query} />

                {loading && (<Preloader />)}

                {!loading && (
                    <>
                        <Movies movies={movies}/>
                        <Pages page={page} setPage={setPage} loading={loading} totalResults={totalResults} />
                    </>
                )}
            </div>
        </main>
    );

}

export {Main}