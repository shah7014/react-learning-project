import React, {createContext, useContext, useEffect, useState} from "react";
import {TCity} from "../types.ts";

const API_URL = 'http://localhost:3001';

const CitiesContext = createContext<{
    cities: TCity[],
    getCurrentCity: (id: string) => void,
    currentCity: TCity | null,
    saveNewCity: (city: Omit<TCity, "id">) => void,
    deleteCity: (id: string | number) => void,
}>({
    cities: [],
    getCurrentCity: () => {},
    currentCity: null,
    saveNewCity: () => {},
    deleteCity: () => {}
});


const CitiesContextProvider = ({children}: { children: React.ReactNode }) => {

    const [cities, setCities] = useState<TCity[]>([]);

    const [currentCity, setCurrentCity] = useState<TCity | null>(null);

    useEffect(() => {
        fetch(`${API_URL}/cities`)
            .then(data => data.json())
            .then(data => setCities(data));
    }, []);

    const getCurrentCity = (id: string) => {
        fetch(`${API_URL}/cities?id=${id}`)
            .then(data => data.json())
            .then(data => setCurrentCity(data[0]));
    }

    const saveNewCity = (city: Omit<TCity, "id">) => {
        fetch(`${API_URL}/cities`, {
            method: "POST",
            body: JSON.stringify(city),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(res => res.json())
            .then((data) => {
                setCities(c => ([...c, data]))
            });
    }

    const deleteCity = async (id: string | number) => {
        try {
            const res = await fetch(`${API_URL}/cities/${id}`, {
                method: "DELETE",
            });
            if (!res.ok) {
                throw new Error("Failed to delete city");
            }
            setCities(c => c.filter(city => city.id !== id));
        } catch (err) {
            console.log(err);
        }
    }

    return <CitiesContext.Provider value={{cities, getCurrentCity, currentCity, saveNewCity, deleteCity}}>
        {children}
    </CitiesContext.Provider>
}

const useCitiesContext = () => {
    const context = useContext(CitiesContext);

    if (context === undefined) {
        throw new Error("CitiesContext is accessed out of CitiesContextProvider");
    }

    return context;
}

export {CitiesContextProvider, useCitiesContext};

