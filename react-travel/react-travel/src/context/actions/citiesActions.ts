import {TCity} from "../../types.ts";

export enum ActionTypes {
    CITIES_LOADED = 'cities/loaded',
    CURRENT_CITY_LOADED = 'currentCity/loaded',
    CITIES_ADDED = 'cities/added',
    CITIES_DELETED = 'cities/deleted',
}

type TSetCitiesAction = {
    type: ActionTypes.CITIES_LOADED,
    payload: TCity[]
}

type TSetCurrentCityAction = {
    type: ActionTypes.CURRENT_CITY_LOADED,
    payload: TCity
}

type TAddCityAction = {
    type: ActionTypes.CITIES_ADDED,
    payload: TCity
}

type TRemoveCityAction = {
    type: ActionTypes.CITIES_DELETED,
    payload: number | string
}

export type TCitiesAction = TSetCitiesAction | TSetCurrentCityAction | TAddCityAction | TRemoveCityAction;


