import {IMovie} from "../../types/Types.ts";
import style from './style.module.scss'
import {useState} from "react";
import {AppDispatch, RootState} from "../../store/store.ts";
import { useDispatch, useSelector } from "react-redux";
import {fetchMovieDetails} from "../../store/reducers/thunk.ts";
import {Link} from "react-router-dom";
import {slugify} from "../../slugify.ts";

const getSelector = ((state: RootState) => state.movies);


const Movie = (props: IMovie) => {
    const {
        Title: title,
        Year: year,
        imdbID: id,
        Type: type,
        Poster: poster,
    } = props;

    // const location = useLocation()
    // console.log(location.search)

    const dispatch = useDispatch<AppDispatch>();
    const [isVisible, setIsVisible] = useState(false);
    const { movieDetails, loading, error } = useSelector(getSelector);
    // console.log(movieDetails[id])


    const details = movieDetails[id];
    // console.log(details)

    const fetchDetails = async (): Promise<void> => {
        dispatch(fetchMovieDetails(id))
    };


    const toggleVisibility = () => {
        if (isVisible) {
            setTimeout(() => {
                setIsVisible(false);
            }, 150)
        } else {
            setIsVisible(true);
        }
    };


    const handleClick = () => {
        fetchDetails()
            .then(() => {
                toggleVisibility();
            })
            .catch((error) => {
                console.error('Error when receiving data:', error);
            })

    }

    const movieSlug = slugify(title)

    return (
        <div id={id} className={style.movieCard}>
            <div className="">
                {
                    poster === 'N/A' ?
                        <img className={style.poster} src={`https://placehold.co/350x450?text=${title}`}/>
                        :
                        <img className={style.poster} src={poster}/>
                }

            </div>
            <div className={`${style.cardContent} ${style.left}`}>
                <Link
                  to={`/movie/${movieSlug}?id=${id}`}
                >
                    <span>
                        <h3 className={style.title}>{title}</h3>
                    </span>
                </Link>

                <div className={style.flexRow}>
                    <p>{year}</p>
                    <span className=''>{type}</span>
                </div>

                <button className={`${style.btn} ${style.infoBtn}`} onClick={handleClick} disabled={loading}>
                    {loading ? 'Загрузка...' : 'Подробнее'}
                </button>

                <div className={
                    `${style.movieDetails} 
                    ${isVisible && `${style.visible}`} 
                    ${!isVisible && `${style.hidden}`}
                    `}
                >

                    {details && (
                        <div className={style.flex}>
                            <p>Рейтинг IMDb: {details.imdbRating ?? 'N/A'}</p>
                            <p>Возрастная категория: {details.Rated ?? 'Ничего не найдено...'}</p>
                            <p className={style.detail}>Сюжет: {details.Plot ?? 'Ничего не найдено...'}</p>
                        </div>
                    )}
                    {error && (
                        <p>{error}</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export { Movie };