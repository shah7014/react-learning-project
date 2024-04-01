export enum CounterActionTypes {
    INCREMENT_COUNT = "INCREMENT_COUNT",
    DECREMENT_COUNT = "DECREMENT_COUNT",
    RESET_COUNT = "RESET_COUNT"
}

export interface IIncrementAction {
    type: CounterActionTypes.INCREMENT_COUNT,
    payload: number
}

export interface IDecrementAction {
    type: CounterActionTypes.DECREMENT_COUNT,
    payload: number
}

export interface IResetAction {
    type: CounterActionTypes.RESET_COUNT
}
