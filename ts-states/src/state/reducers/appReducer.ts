import {Action, AppActions} from "../action-types";

const initialState = {
    isLoading: false,
    success: {canShow: false, message: ""},
    error: {canShow: false, message: ""}
}

export const appReducer = (state = initialState, action: Action) => {
    switch (action.type) {
        case AppActions.SET_IS_LOADING: {
            return {
                ...state,
                isLoading: !state.isLoading
            }
        }
        case AppActions.SET_SUCCESS:
        case AppActions.SET_ERROR: {
            return {
                ...state,
                success: {canShow: !!action.payload.message, message: action.payload.message}
            }
        }
        default: {
            return state;
        }
    }
}
