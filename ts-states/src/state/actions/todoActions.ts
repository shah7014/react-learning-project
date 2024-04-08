import {Action, TodoActions} from "../action-types";
import {Color} from "../../types";

export const addTodo = (text: string): Action => {
    return {
        type: TodoActions.TODO_ADD_TODO,
        payload: text
    }
}
export const deleteTodo = (id: string): Action => {
    return {
        type: TodoActions.TODO_DELETE_TODO,
        payload: id
    }
}
export const toggleTodo = (id: string): Action => {
    return {
        type: TodoActions.TODO_TOGGLE_COMPLETE,
        payload: id
    }
}
export const setColor = (id: string, color: Color): Action => {
    return {
        type: TodoActions.TODO_SELECT_COLOR,
        payload: {id, color}
    }
}
export const markAllCompleted = (): Action => {
    return {
        type: TodoActions.TODO_ALL_COMPLETE
    }
}
export const deleteAllComplete = (): Action => {
    return {
        type: TodoActions.TODO_DELETE_ALL_COMPLETE
    }
}

