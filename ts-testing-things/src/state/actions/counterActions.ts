import {CounterActionTypes} from "../action-types/counterActionTypes";
import {Action} from "../action-types";

export const incrementCount = (value: number): Action => {
    return {
        type: CounterActionTypes.INCREMENT_COUNT,
        payload: value
    }
}
export const decrementCount = (value: number): Action => {
    return {
        type: CounterActionTypes.DECREMENT_COUNT,
        payload: value
    }
}
export const resetCount = (): Action => {
    return {
        type: CounterActionTypes.RESET_COUNT
    }
}



