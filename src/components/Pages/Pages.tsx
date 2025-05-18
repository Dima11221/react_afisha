import style from "../../components/Pages/style.module.scss";


interface IPages {
    page: number;
    setPage: (page: number) => void;
    loading: boolean;
    totalResults: number;
}

const Pages = ({page, setPage, loading, totalResults}: IPages) => {

    const handleNextPage = () => {
        setPage(page + 1)
    };

    const handlePreviousPage = () => {
        setPage(Math.max(1, page - 1))
    }

    return (
        <div className={style.buttonsPos}>
            <button
                className={`${style.btn} ${style.btnReset} ${style.btnPage}`}
                onClick={handlePreviousPage}
                disabled={loading || page === 1}
            >
                <span>Previous page</span>
            </button>
            <button
                className={`${style.btn} ${style.btnReset} ${style.btnPage}`}
                onClick={handleNextPage}
                disabled={loading || page * 10 >= totalResults}
            >
                <span>Next page</span>
            </button>
        </div>
    )
}

export {Pages}