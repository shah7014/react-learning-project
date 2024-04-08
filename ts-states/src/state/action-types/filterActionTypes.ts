import {Color, Status} from "../../types";

export enum FilterActions {
    FILTER_TODO_STATUS_CHANGE = "filter/statusFilterChange",
    FILTER_TODO_COLOR_CHANGE = "filter/colorFilterChange"
}


type FilterStatusChangeActionType = {
    type: FilterActions.FILTER_TODO_STATUS_CHANGE,
    payload: Status
}

type FilterColorChangeActionType = {
    type: FilterActions.FILTER_TODO_COLOR_CHANGE,
    payload: {color: Color, changeType: "ADD" | "REMOVE"}
}

export type FilterActionType = FilterStatusChangeActionType | FilterColorChangeActionType

