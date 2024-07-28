import React, {useEffect, useState} from "react";
import {Route, Routes} from "react-router-dom";

import HomePage from "./pages/HomePage.tsx";
import ProductPage from "./pages/ProductPage.tsx";
import PricingPage from "./pages/PricingPage.tsx";
import NotFoundPage from "./pages/NotFoundPage.tsx";
import LoginPage from "./pages/LoginPage.tsx";
import AppLayout from "./pages/AppLayout.tsx";
import CityList from "./components/CityList.tsx";
import {TCity} from "./types.ts";
import CountryList from "./components/CountryList.tsx";

const API_URL = 'http://localhost:3001';

const App: React.FC = () => {

    const [cities, setCities] = useState<TCity[]>([]);

    useEffect(() => {
        fetch(`${API_URL}/cities`)
            .then(data => data.json())
            .then(data => setCities(data));
    }, []);

    return (
        <>
            <Routes>
                <Route path={"/"} element={<HomePage/>}/>
                <Route path={"product"} element={<ProductPage/>}/>
                <Route path={"pricing"} element={<PricingPage/>}/>
                <Route path={"login"} element={<LoginPage/>}/>
                <Route path={"app"} element={<AppLayout/>}>
                    <Route index element={<CityList cities={cities}/>}/>
                    <Route path={"cities"} element={<CityList cities={cities}/>}/>
                    <Route path={"countries"} element={<CountryList cities={cities} />}/>
                </Route>
                <Route path={"*"} element={<NotFoundPage/>}/>
            </Routes>
        </>
    )
}

export default App
