import {createStore, applyMiddleware} from "redux";
import {composeWithDevTools} from "redux-devtools-extension";
import thunk from "redux-thunk";
import {reducer} from "./reducers";

export const store = createStore(
    reducer,
    composeWithDevTools(applyMiddleware(thunk))
);

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

