import {combineReducers} from "redux";
import {appReducer} from "./appReducer";
import {postReducer} from "./postReducer";
import todoReducer from "./todoReducer";
import filterReducer from "./filterReducer";

export const reducer = combineReducers({
    app: appReducer,
    post: postReducer,
    todos: todoReducer,
    filters: filterReducer
});



