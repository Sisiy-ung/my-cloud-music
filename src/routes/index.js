import Home from '../application/Home';
import Recommend from '../application/Recommend';
import Singers from '../application/Singers';
import Rank from '../application/Rank';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';


const MyRouter = () => {
    return(
        <BrowserRouter>
            <Routes>
                <Route exact path="/home" element={<Home />} />
                <Route exact path="/" element={<Navigate replace to="/home" />} />
                <Route exact path="/rank" element={<Rank/>} />
                <Route exact path="/recommend" element={<Recommend/>} />
                <Route exact path="/singers" element={<Singers/>} />
            </Routes>
        </BrowserRouter>
    )
}
export default MyRouter
