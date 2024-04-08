import {Color, Status} from "../../types";
import {Action, FilterActions} from "../action-types";

export const setStatus = (status: Status): Action => {
    return {
        type: FilterActions.FILTER_TODO_STATUS_CHANGE,
        payload: status
    }
}
export const setColor = (color: Color, changeType: "ADD" | "REMOVE"): Action => {
    return {
        type: FilterActions.FILTER_TODO_COLOR_CHANGE,
        payload: {color, changeType}
    }
}

