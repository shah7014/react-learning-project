import {combineReducers} from "redux";
import {appReducer} from "./appReducer";
import {postReducer} from "./postReducer";

export const reducer = combineReducers({
    app: appReducer,
    post: postReducer
});



