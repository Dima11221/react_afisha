import {Header} from "./layout/Header/Header.tsx";
import {Footer} from "./layout/Footer/Footer.tsx";
import {Main} from "./layout/Main/Main.tsx";
import './styles/globals.scss'
import {Routes, Route, HashRouter} from "react-router-dom";
import {MovieCard} from "./components/MovieCard/MovieCard.tsx";

function App() {


    return (

    <HashRouter>
        <div>
            <Header title="OMDb Movies" />

            <Routes>
                <Route path="/" element={<Main />} />
                <Route path="/movie/:slug" element={<MovieCard />} />
            </Routes>

            <Footer text="GitHub page" />
        </div>
    </HashRouter>

    )
}

export default App
