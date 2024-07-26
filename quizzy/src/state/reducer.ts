import {AppStates, TQuestion} from "../components/types";
import {Actions, TAction} from "./actions";

export type TInitialState = {
    questions: TQuestion[],
    status: AppStates,
    score: number,
    currentQuestionNumber: number,
    maxScore: number
}

export const initialState: TInitialState = {
    questions: [],
    status: AppStates.LOADING,
    score: 0,
    currentQuestionNumber: 0,
    maxScore: 0
}

export const reducer = (state = initialState, action: TAction) => {
    switch (action.type) {
        case Actions.SET_ERROR: {
            return {
                ...state,
                status: AppStates.ERROR
            }
        }
        case Actions.SET_READY: {
            return {
                ...state,
                questions: action.payload,
                status: AppStates.READY,
                maxScore: action.payload
                    .map(q => q.points)
                    .reduce((acc, currVal) => {
                        return acc + currVal
                    }, 0)
            }
        }
        case Actions.SET_QUIZ_START: {
            return {
                ...state,
                status: AppStates.ACTIVE,
                currentQuestionNumber: 0,
                score: 0
            }
        }
        case Actions.SET_SCORE: {
            return {...state, score: state.score + action.payload};
        }
        case Actions.GO_TO_NEXT: {
            return {...state, currentQuestionNumber: state.currentQuestionNumber + 1}
        }
        case Actions.SET_QUIZ_FINISHED: {
            return {
                ...state,
                status: AppStates.FINISHED
            }
        }
        default: {
            return state
        }
    }
}


