import React from 'react';
import Home from './pages/components/Home/Home'
import Header from '../src/shared/Header/Header'
import MonthStatistics from "./pages/components/Month_Statistics/MonthStatistics";
import {Route, Routes} from "react-router-dom"
import './styles/index.scss'
import Popup from "./shared/Popup/Popup";
import Weather from "./services/Weather";


const App = () => {
    return (
        <div className="global-container">
            <div className="container">
                <Weather city={'city'}/>
                <Header/>
                <Routes>
                    <Route path={'/'} element={<Home/>}></Route>
                    <Route path={'/month-statistics'} element={<MonthStatistics/>}></Route>
                </Routes>
            </div>
        </div>
    )
}


export default App