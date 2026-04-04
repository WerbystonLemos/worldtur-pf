import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './src/Pages/Home/Home';

function RoutesApp() {
    return(
        <BrowserRouter>
            <Routes>
                <Route path='/' element={ <Home/> } />
            </Routes>
        </BrowserRouter>
    )
}

export default RoutesApp;