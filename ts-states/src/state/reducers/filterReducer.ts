import {Color, Status} from "../../types";
import {Action, FilterActions} from "../action-types";
import {createSelector} from "reselect";

type FilterState = {
    status: Status;
    colors: Color[]
}

const initialState: FilterState = {
    status: Status.ALL,
    colors: []
}

const filterReducer = (state = initialState, action: Action) => {
    switch (action.type) {
        case FilterActions.FILTER_TODO_STATUS_CHANGE: {
            return {...state, status: action.payload}
        }
        case FilterActions.FILTER_TODO_COLOR_CHANGE: {
            let newColors;
            if (action.payload.changeType === "ADD") {
                newColors = [...state.colors, action.payload.color]
            } else {
                newColors = state.colors.filter(c => c !== action.payload.color)
            }

            return {...state, colors: newColors}
        }
        default: {
            return state
        }
    }
}

export const filterSelector = (state: {filters: FilterState}) => state.filters


export default filterReducer;

