import {Action, AppActions} from "../action-types";

export const setIsLoading = (): Action => {
    return {
        type: AppActions.SET_IS_LOADING
    }
}

export const setSuccess = (message = ""): Action => {
    return {
        type: AppActions.SET_SUCCESS,
        payload: {message}
    }
}

export const setError = (message = ""): Action => {
    return {
        type: AppActions.SET_ERROR,
        payload: {message: message}
    }
}
