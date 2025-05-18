import style from "../FilterType/style.module.scss";
import {ChangeEvent} from "react";

interface IFilterType {
    handleFilter: (event: ChangeEvent<HTMLInputElement>) => void,
    type: 'all' | 'movie' | 'series' | 'game',
}

const FilterType = ({handleFilter, type}:IFilterType) => {
    const types = ['all', 'movie','series','game'];


    return (
        <div className={`${style.flex} ${style.btnsBox}`}>

            {types.map((filter) => (
                <label key={filter} className={`${style.withGap} ${style.radioButtonsStandart}`}>
                    <input
                        name="type"
                        type="radio"
                        data-type={filter}
                        onChange={handleFilter}
                        checked={type === filter}
                    />
                    <span className={style.span}>{filter.toUpperCase().slice(0,1) + filter.slice(1)}</span>
                </label>
            ))}

        </div>
    )
}

export { FilterType };