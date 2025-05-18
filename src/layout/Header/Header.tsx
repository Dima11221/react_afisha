import style from './style.module.scss'
import {Link} from "react-router-dom";

interface IProps {
    title: string;
}

const Header = ({title}: IProps) => {

    return (
        <div className={style.headFoot}>
            <div className={`${style.container} ${style.headFootWrapper}`}>
                <h2 className={style.headLink}>
                    <Link to='/'>{title}</Link>
                </h2>
                <h3>
                    <a href="#">Огромный выбор фильмов, сериалов и компьютерных игр на ваш вкус!</a>
                </h3>
                <h3 className={style.headLink}>
                    <Link to='/'>Главная страница</Link>
                </h3>
            </div>
        </div>
    )

}

export {Header}