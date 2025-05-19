import {useEffect, useState} from 'react';
import { Movies } from '../../components/Movies/Movies.tsx';
import { Search } from '../../components/Search/Search.tsx';
import {Preloader} from "../../components/Preloader/Preloader.tsx";
import {fetchMovies} from "../../store/reducers/thunk.ts";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../store/store.ts";
import style from './style.module.scss'
import {Pages} from "../../components/Pages/Pages.tsx";
import {useSearchParams} from "react-router-dom";

interface IFilter {
    query: string;
    type: 'all' | 'movie' | 'series' | 'game';
}

const getMovieSelector = ((state: RootState) => state.movies);

const Main = () => {
    const {movies, loading, totalResults} = useSelector(getMovieSelector);
    const [searchParams, setSearchParams] = useSearchParams();

    const dispatch = useDispatch<AppDispatch>();

    const initalQuery = searchParams.get('query') || 'movie';
    const initialType = (searchParams.get('type') as IFilter['type'] || 'all')
    const initialPage = parseInt(searchParams.get('page') || '1', 10);
    // console.log(initialPage, initialType, initalQuery)

    const [type, setType] = useState<IFilter['type']>(initialType);
    const [query, setQuery] = useState<string>(initalQuery);
    const [page, setPage] = useState<number>(initialPage);

    const searchMovies = ({query, type}:IFilter) => {
        if (!query.trim()) {
            return;
        }

        setQuery(query);
        setType(type);
        setPage(1);
        setSearchParams({query, type, page: '1'});
        dispatch(fetchMovies({query, type, page: 1, append: false} ));
    }


    useEffect(() => {
        const hasParams = searchParams.has('query') || searchParams.has('type') || searchParams.has('page');
        const currentParams = searchParams.toString();
        const newParams = new URLSearchParams({query, type, page: String(page)}).toString();

        if (currentParams !== newParams && hasParams) {
            setSearchParams(newParams);
        }
        dispatch(fetchMovies({query, type, page, append: page > 1
    }));
    }, [query, type, page, dispatch, searchParams, setSearchParams]);



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