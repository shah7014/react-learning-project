import {Color} from "../../types";

export enum TodoActions {
    TODO_ADD_TODO = "todo/addTodo",
    TODO_DELETE_TODO = "todo/deleteTodo",
    TODO_SELECT_COLOR = "todo/selectColor",
    TODO_TOGGLE_COMPLETE = "todo/toggleComplete",
    TODO_ALL_COMPLETE = "todo/markAllComplete",
    TODO_DELETE_ALL_COMPLETE = "todo/deleteAllComplete"
}

type TodoAddActionType = {
    type: TodoActions.TODO_ADD_TODO,
    payload: string
}

type TodoDeleteActionType = {
    type: TodoActions.TODO_DELETE_TODO,
    payload: string
}

type TodoSelectColorActionType = {
    type: TodoActions.TODO_SELECT_COLOR,
    payload: { id: string, color: Color }
}

type TodoToggleCompleteActionType = {
    type: TodoActions.TODO_TOGGLE_COMPLETE,
    payload: string
}

type TodoAllCompleteActionType = {
    type: TodoActions.TODO_ALL_COMPLETE,
}

type TodoDeleteAllCompleteActionType = {
    type: TodoActions.TODO_DELETE_ALL_COMPLETE,
}

export type TodoActionType = TodoAddActionType | TodoDeleteActionType | TodoSelectColorActionType
    | TodoToggleCompleteActionType | TodoAllCompleteActionType | TodoDeleteAllCompleteActionType;


