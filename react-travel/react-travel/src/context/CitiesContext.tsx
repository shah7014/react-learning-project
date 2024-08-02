import React, {createContext, useCallback, useContext, useEffect, useReducer} from "react";
import {TCity} from "../types.ts";
import {ActionTypes} from "./actions/citiesActions.ts";
import {TAction} from "./actions/actions.ts";

const API_URL = 'http://localhost:3001';

type TInitialState = {
    cities: TCity[],
    currentCity: TCity | null,
}

const initialState: TInitialState = {
    cities: [],
    currentCity: null
}

const reducer = (state = initialState, action: TAction) => {
    switch (action.type) {
        case ActionTypes.CITIES_LOADED: {
            return {
                ...state,
                cities: action.payload
            }
        }
        case ActionTypes.CURRENT_CITY_LOADED: {
            return {
                ...state,
                currentCity: action.payload
            }
        }
        case ActionTypes.CITIES_ADDED: {
            return {
                ...state,
                cities: [...state.cities, action.payload]
            }
        }
        case ActionTypes.CITIES_DELETED: {
            return {
                ...state,
                cities: state.cities.filter(ci => ci.id !== action.payload)
            }
        }
        default: {
            return state;
        }
    }
}

const CitiesContext = createContext<{
    cities: TCity[],
    getCurrentCity: (id: string) => void,
    currentCity: TCity | null,
    saveNewCity: (city: Omit<TCity, "id">) => void,
    deleteCity: (id: string | number) => void,
}>({
    cities: [],
    getCurrentCity: () => {
    },
    currentCity: null,
    saveNewCity: () => {
    },
    deleteCity: () => {
    }
});


const CitiesContextProvider = ({children}: { children: React.ReactNode }) => {

    const [{cities, currentCity}, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        fetch(`${API_URL}/cities`)
            .then(data => data.json())
            .then(data => dispatch({type: ActionTypes.CITIES_LOADED, payload: data}));
    }, []);

    // const getCurrentCity = (id: string) => {
    //     fetch(`${API_URL}/cities?id=${id}`)
    //         .then(data => data.json())
    //         .then(data => dispatch({type: ActionTypes.CURRENT_CITY_LOADED, payload: data[0]}));
    // }

    const getCurrentCity = useCallback(async (id: string) => {
        try {
            const res = await fetch(`${API_URL}/cities/?id=${id}`);
            if (!res.ok) {
                throw new Error('Error fetching city data');
            }
            const data = await res.json();
            dispatch({type: ActionTypes.CURRENT_CITY_LOADED, payload: data[0]})
        } catch(err) {
            console.log(err);
        }
    }, []);

    const saveNewCity = (city: Omit<TCity, "id">) => {
        fetch(`${API_URL}/cities`, {
            method: "POST",
            body: JSON.stringify(city),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(res => res.json())
            .then((data) => {
                dispatch({type: ActionTypes.CITIES_ADDED, payload: data})
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
            dispatch({type: ActionTypes.CITIES_DELETED, payload: id})
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

