import {IDecrementAction, IIncrementAction, IResetAction} from "./counterActionTypes";

export type Action = IIncrementAction |
    IDecrementAction |
    IResetAction;

