import React, {lazy, Suspense} from "react";
import {Navigate, Route, Routes} from "react-router-dom";

import {CitiesContextProvider} from "./context/CitiesContext.tsx";
import {FakeAuthContextProvider} from "./context/FakeAuthContext.tsx";
import CityList from "./components/CityList.tsx";
import CountryList from "./components/CountryList.tsx";
import City from "./components/City.tsx";
import Form from "./components/Form.tsx";
import ProtectedRoute from "./pages/ProtectedRoute.tsx";
import SpinnerFullPage from "./components/SpinnerFullPage.tsx";


// import HomePage from "./pages/HomePage.tsx";
// import ProductPage from "./pages/ProductPage.tsx";
// import PricingPage from "./pages/PricingPage.tsx";
// import NotFoundPage from "./pages/NotFoundPage.tsx";
// import LoginPage from "./pages/LoginPage.tsx";
// import AppLayout from "./pages/AppLayout.tsx";

const HomePage = lazy(() => import('./pages/HomePage.tsx'));
const ProductPage = lazy(() => import('./pages/ProductPage.tsx'));
const PricingPage = lazy(() => import('./pages/PricingPage.tsx'));
const LoginPage = lazy(() => import('./pages/LoginPage.tsx'));
const AppLayout = lazy(() => import('./pages/AppLayout.tsx'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage.tsx'));

// dist/assets/index-910cd178.css   30.11 kB │ gzip:   4.96 kB
// dist/assets/index-5a286bff.js   507.99 kB │ gzip: 148.57 kB


const App: React.FC = () => {

    return (
        <FakeAuthContextProvider>
            <CitiesContextProvider>
                <Suspense fallback={<SpinnerFullPage/>}>
                    <Routes>
                        <Route path={"/"} element={<HomePage/>}/>
                        <Route path={"product"} element={<ProductPage/>}/>
                        <Route path={"pricing"} element={<PricingPage/>}/>
                        <Route path={"login"} element={<LoginPage/>}/>
                        <Route path={"app"} element={
                            <ProtectedRoute>
                                <AppLayout/>
                            </ProtectedRoute>
                        }>
                            <Route index element={<Navigate replace to={'cities'}/>}/>
                            <Route path={"cities"} element={<CityList/>}/>
                            <Route path={"cities/:cityId"} element={<City/>}/>
                            <Route path={"countries"} element={<CountryList/>}/>
                            <Route path={"form"} element={<Form/>}/>
                        </Route>
                        <Route path={"*"} element={<NotFoundPage/>}/>
                    </Routes>
                </Suspense>
            </CitiesContextProvider>
        </FakeAuthContextProvider>
    )
}

export default App
