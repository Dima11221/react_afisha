import {useEffect} from 'react';
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

    const query = searchParams.get('query') || 'movie';
    const type = (searchParams.get('type') as IFilter['type'] || 'all')
    const page = parseInt(searchParams.get('page') || '1', 10);


    const searchMovies = ({query, type}:IFilter) => {

        setSearchParams({query, type, page: '1'});
        dispatch(fetchMovies({query, type, page: 1, append: false} ));
    };

    const handlePageChange = (newPage: number) => {
        setSearchParams({ query, type, page: newPage.toString() });
    };

    useEffect(() => {
        if (!query.trim()) return;

        dispatch(fetchMovies({query, type, page, append: false}))

    }, [dispatch, query, type, page]);



    return (
        <main className={style.mainWrapper}>
            <div>
                <Search searchMovies={searchMovies} type={type} query={query} />

                {loading && (<Preloader />)}

                {!loading && (
                    <>
                        <Movies movies={movies}/>
                        <Pages page={page} handlePageChange={handlePageChange} loading={loading} totalResults={totalResults} />
                    </>
                )}
            </div>
        </main>
    );

}

export {Main}