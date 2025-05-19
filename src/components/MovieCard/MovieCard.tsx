import style from "../MovieCard/style.module.scss";
import {useNavigate, useSearchParams} from "react-router-dom"
import {useEffect} from "react";
import {AppDispatch, RootState} from "../../store/store.ts";
import { useDispatch, useSelector } from "react-redux";
import {fetchMovieDetails} from "../../store/reducers/thunk.ts";


const getMovieCardSelector = ((state: RootState) => state.movies);

const MovieCard = () => {

    const [searchParams] = useSearchParams();
    const imdbID = searchParams.get('id');
    // console.log(imdbID)
    // const {imdbID} = useParams<{imdbID: string}>()
    // console.log({imdbID})
    const dispatch = useDispatch<AppDispatch>();
    const {movieDetails, loading, error} = useSelector(getMovieCardSelector);

    const navigate = useNavigate();
    const goBack = () => {
        navigate(-1)
    }

    useEffect(() => {
        if (imdbID) {
            dispatch(fetchMovieDetails(imdbID))
        }
    }, [imdbID, dispatch]);
    // console.log(movieDetails)


    const details = movieDetails[imdbID ?? ''];

    if (loading) return <p className={`${style.container} ${style.error} ${style.linkWrapper}`}>Загрузка...</p>;
    if (error) return <p className={`${style.container} ${style.error} ${style.linkWrapper}`}>Ошибка: {error}</p>;

    return (
        <div className={style.linkWrapper}>
            <div className={`${style.linkWrapperContent} ${style.container}`}>
                <button
                  className={`${style.btn} ${style.btnPos}`}
                  onClick={goBack}
                >
                    Назад
                </button>
                {details && (
                  <div className={`${style.flex}`}>
                      <img className={style.LinkPoster} src={details.Poster} alt={details.Title}/>
                      <div className={`${style.flex} ${style.linkContentInfo}`}>
                          <h1>{details.Title}</h1>
                          <p><strong>Год:</strong> {details.Year}</p>
                          <p><strong>Возрастная категория:</strong> {details.Rated ?? 'Ничего не найдено...'}</p>
                          <p><strong>Страна:</strong> {details.Country ?? 'Ничего не найдено...'}</p>
                          <p><strong>Длительность:</strong> {details.Runtime ?? 'Ничего не найдено...'}</p>
                          <p><strong>Жанр:</strong> {details.Genre ?? 'Ничего не найдено...'}</p>
                          <p><strong>Режиссёр:</strong> {details.Director ?? 'Ничего не найдено...'}</p>
                          <p><strong>Актёры:</strong> {details.Actors ?? 'Ничего не найдено...'}</p>
                          <p><strong>Сюжет:</strong> {details.Plot ?? 'Ничего не найдено...'}</p>


                          <p><strong>Рейтинги:</strong>
                              {details.Ratings && details.Ratings.length > 0 && (
                                <ul>
                                    {details.Ratings.map((rating, index) => (
                                      <li key={index}>
                                          <strong>{rating.Source}: </strong>
                                          {rating.Value}
                                      </li>
                                    ))}
                                </ul>
                              )}

                              {details.Ratings && details.Ratings.length === 0 && (
                                <p>Ничего не найдено</p>
                              )}
                          </p>
                      </div>
                  </div>
                )}

                {!details && (
                  <p className={`${style.container} ${style.error}`}>Тут должны быть данные о фильме.</p>
                )}
            </div>
        </div>
    )
}

export {MovieCard}