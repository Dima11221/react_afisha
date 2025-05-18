import {KeyboardEvent, ChangeEvent, useState} from 'react';
import style from './style.module.scss'
import {FilterType} from "../FilterType/FilterType.tsx";


export interface ISearch {
    searchMovies: (params: {query: string, type: 'all' | 'movie' | 'series' | 'game'}) => void
    query: string;
    type: 'all' | 'movie' | 'series' | 'game';
}

const Search = ({searchMovies, query, type: parentType}: ISearch) => {
    const [search, setSearch] = useState<string>('');
    const [type, setType] = useState<ISearch['type']>(parentType || 'all');


    const handleKey = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            searchMovies({query: search, type});
        }
    }

    const handleFilter = (event: ChangeEvent<HTMLInputElement>) => {
        const type = event.target.dataset.type as 'all' | 'movie' | 'series' | 'game';
        setType(type);
        searchMovies({query: search || query, type})
    }


    return (

        <div className={style.row}>
            <div className={style.inputField}>
                <input
                    className={`${style.inputStyle}`}
                    placeholder="Название... (Iron man)"
                    type="search"
                    value={search || ''}
                    onChange={(e) =>
                        setSearch(e.target.value)
                    }
                    onKeyDown={handleKey}
                />
                <button
                    className={`${style.btn} ${style.searchBtn} ${style.btnReset}`}
                    onClick={() => {
                        searchMovies({query: search, type});
                    }}
                >
                    Поиск
                </button>

                <FilterType type={type} handleFilter={handleFilter} />

            </div>
        </div>
    );

}

export {Search};