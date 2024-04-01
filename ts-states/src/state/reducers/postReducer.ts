import {Action, PostActions} from "../action-types";

const intialState = {
    posts: [],
    selectedPost: null
}

export const postReducer = (state = intialState, action: Action) => {
    switch(action.type) {
        case PostActions.SET_POSTS: {
            return {
                ...state,
                posts: action.payload
            }
        }
        case PostActions.SET_SELECTED_POST: {
            return {
                ...state,
                selectedPost: action.payload
            }
        }
        default: {
            return state
        }
    }
}

