import {AppStates, TQuestion} from "../components/types";
import {Actions, TAction} from "./actions";

export type TInitialState = {
    questions: TQuestion[],
    status: AppStates,
    score: number,
    newAnswer: number | null,
    currentQuestionNumber: number,
    maxScore: number
}

export const initialState: TInitialState = {
    questions: [],
    status: AppStates.LOADING,
    score: 0,
    currentQuestionNumber: 0,
    newAnswer: null,
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
                score: 0,
                newAnswer: null
            }
        }
        case Actions.SET_ANSWER: {
            const userAnswered = action.payload;
            const {correctOption, points: rewardPoints} = state.questions[state.currentQuestionNumber];
            return {
                ...state,
                newAnswer: userAnswered,
                score: userAnswered === correctOption ? state.score + rewardPoints : state.score
            }
        }
        case Actions.GO_TO_NEXT: {
            return {
                ...state,
                currentQuestionNumber: state.currentQuestionNumber + 1,
                newAnswer: null
            }
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


