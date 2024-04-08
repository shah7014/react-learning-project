import {Color, Status, Todo} from "../../types";
import {Action, TodoActions} from "../action-types";
// @ts-ignore
import {v4 as uuidv4} from "uuid";
import {createSelector} from "reselect";
import {filterSelector} from "./filterReducer";

type TodoState = {
    todos: {[key: string]: Todo}
}


const initialState: TodoState = {
    todos: {
        0: {id: "0", text: "Learn React", isCompleted: Status.ACTIVE},
        1: {id: "1", text: "Learn Redux old way", isCompleted: Status.ACTIVE, color: Color.PURPLE},
        2: {id: "2", text: "Learn Redux Toolkit new way", isCompleted: Status.ACTIVE, color: Color.BLUE},
    }
};

const todoReducer = (state = initialState, action: Action) => {
    switch (action.type) {
        case TodoActions.TODO_ADD_TODO: {
            const newTodo: Todo = {id: uuidv4(), text: action.payload, isCompleted: Status.ACTIVE};
            return {
                ...state,
                todos: {
                    ...state.todos,
                    [newTodo.id]: newTodo
                }
            }
        }
        case TodoActions.TODO_DELETE_TODO: {
            const newTodos = {...state.todos};
            delete newTodos[action.payload]
            return {
                ...state,
                todos: newTodos
            }
        }
        case TodoActions.TODO_TOGGLE_COMPLETE: {
            const todoId = action.payload;
            let todo = state.todos[todoId];
            return {
                ...state,
                todos: {
                    ...state.todos,
                    [action.payload]: {...todo, isCompleted: todo.isCompleted === Status.COMPLETED ? Status.ACTIVE : Status.COMPLETED}
                }
            }
        }
        case TodoActions.TODO_SELECT_COLOR: {
            const {id: todoId, color} = action.payload;
            const todo = state.todos[todoId];
            return {
                ...state,
                todos: {
                    ...state.todos,
                    [todoId]: {...todo, color}
                }
            }
        }
        case TodoActions.TODO_ALL_COMPLETE: {
            const newTodos = {...state.todos};
            Object.values(newTodos).forEach(todo => {
                newTodos[todo.id] = {...todo, isCompleted: Status.COMPLETED}
            })
            return {
                ...state,
                todos: newTodos
            }
        }
        case TodoActions.TODO_DELETE_ALL_COMPLETE: {
            const uncompletedTodos = Object.values(state.todos).filter(t => t.isCompleted === Status.ACTIVE);
            return {
                ...state,
                todos: uncompletedTodos
            }
        }
        default: {
            return state;
        }
    }
}

export const todosSelector = createSelector(
    (state: {todos: TodoState}) => state.todos.todos,
    todoByIds => Object.values(todoByIds)
);

export const todosByIdSelector = (state: {todos: TodoState}, todoId: string) => state.todos.todos[todoId];

export const filteredTodosSelector = createSelector(
    [todosSelector, filterSelector],
    (todos, filter) => {
        const {status, colors} = filter;
        let filteredTodos = todos;
        if (status !== Status.ALL) {
            filteredTodos = filteredTodos.filter(t => t.isCompleted === status);
        }
        if (colors.length !== 0) {
            filteredTodos = filteredTodos.filter(t => t.color && colors.includes(t.color))
        }
        return filteredTodos;
    }
)

export default todoReducer;
