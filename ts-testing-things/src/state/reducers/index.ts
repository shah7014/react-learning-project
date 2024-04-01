import {combineReducers} from "redux";
import {counterReducer} from "./counterReducer";

const reducers = combineReducers({
    count: counterReducer
})

export default reducers;

