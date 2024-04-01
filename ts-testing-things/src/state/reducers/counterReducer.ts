import {CounterActionTypes} from "../action-types/counterActionTypes";
import {Action} from "../action-types";


const initialState = {
    count: 0
}

export const counterReducer = (state = initialState, action: Action) => {
    switch (action.type) {
        case CounterActionTypes.INCREMENT_COUNT: {
            return {
                ...state,
                count: state.count + action.payload
            }
        }
        case CounterActionTypes.DECREMENT_COUNT: {
            return {
                ...state,
                count: state.count - action.payload
            }
        }
        case CounterActionTypes.RESET_COUNT: {
            return {
                ...state, count: 0
            }
        }
        default: {
            return state;
        }
    }
}

