import {TQuestion} from "../components/types";


export enum Actions {
    SET_ERROR = 'SET_ERROR',
    SET_READY = 'SET_READY',
    SET_QUIZ_START = 'SET_QUIZ_START',
    SET_ANSWER = 'SET_ANSWER',
    SET_QUIZ_FINISHED = 'SET_QUIZ_FINISHED',
    SET_SCORE = 'SET_SCORE',
    GO_TO_NEXT = 'GO_TO_NEXT',
    TICK = 'TICK'
}

type TSetErrorStatusAction = {
    type: Actions.SET_ERROR,
}

type TQuizReadyAction = {
    type: Actions.SET_READY,
    payload: TQuestion[]
}

type TQuizStartAction = {
    type: Actions.SET_QUIZ_START
}

type TSetAnswerAction = {
    type: Actions.SET_ANSWER,
    payload: number
}

type TQuizFinishedAction = {
    type: Actions.SET_QUIZ_FINISHED
}

type TVerifyAndSetScore = {
    type: Actions.SET_SCORE,
    payload: number
}

type TGoToNextQuestion = {
    type: Actions.GO_TO_NEXT
}

type TTickAction = {
    type: Actions.TICK
}

export type TAction =
    | TSetErrorStatusAction
    | TQuizReadyAction
    | TQuizStartAction
    | TQuizFinishedAction
    | TVerifyAndSetScore
    | TGoToNextQuestion
    | TSetAnswerAction
    | TTickAction;


