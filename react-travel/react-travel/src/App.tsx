import React from "react";
import {Navigate, Route, Routes} from "react-router-dom";

import HomePage from "./pages/HomePage.tsx";
import ProductPage from "./pages/ProductPage.tsx";
import PricingPage from "./pages/PricingPage.tsx";
import NotFoundPage from "./pages/NotFoundPage.tsx";
import LoginPage from "./pages/LoginPage.tsx";
import AppLayout from "./pages/AppLayout.tsx";
import CityList from "./components/CityList.tsx";
import CountryList from "./components/CountryList.tsx";
import City from "./components/City.tsx";
import Form from "./components/Form.tsx";
import {CitiesContextProvider} from "./context/CitiesContext.tsx";



const App: React.FC = () => {

    return (
        <CitiesContextProvider>
            <Routes>
                <Route path={"/"} element={<HomePage/>}/>
                <Route path={"product"} element={<ProductPage/>}/>
                <Route path={"pricing"} element={<PricingPage/>}/>
                <Route path={"login"} element={<LoginPage/>}/>
                <Route path={"app"} element={<AppLayout/>}>
                    <Route index element={<Navigate replace to={'cities'} />}/>
                    <Route path={"cities"} element={<CityList />}/>
                    <Route path={"cities/:cityId"} element={<City />}/>
                    <Route path={"countries"} element={<CountryList />}/>
                    <Route path={"form"} element={<Form />}/>
                </Route>
                <Route path={"*"} element={<NotFoundPage/>}/>
            </Routes>
        </CitiesContextProvider>
    )
}

export default App
