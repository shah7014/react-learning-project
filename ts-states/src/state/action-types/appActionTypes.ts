export enum AppActions {
    SET_IS_LOADING= "SET_IS_LOADING",
    SET_SUCCESS = "SET_SUCCESS",
    SET_ERROR = "SET_ERROR"
}

type IsLoadingActionType = {
    type: AppActions.SET_IS_LOADING
}
type SuccessActionType = {
    type: AppActions.SET_SUCCESS,
    payload: {message: string}
}
type ErrorActionType = {
    type: AppActions.SET_ERROR,
    payload: { message: string }
}

export type AppActionType = IsLoadingActionType | SuccessActionType | ErrorActionType;
