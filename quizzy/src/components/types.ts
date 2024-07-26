export type TQuestion = {
    question: string,
    options: string[],
    correctOption: number,
    points: number
}

export enum AppStates {
    LOADING,
    ERROR,
    READY,
    ACTIVE,
    FINISHED
}

