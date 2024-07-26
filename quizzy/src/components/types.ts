export type TQuestion = {
    question: string,
    options: string[],
    correctOption: number,
    points: number
}

export enum AppStates {
    LOADING = 'LOADING',
    ERROR = 'ERROR',
    READY = 'READY',
    ACTIVE = 'ACTIVE',
    FINISHED = 'FINISHED'
}
