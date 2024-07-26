import React, {createContext, useReducer} from "react";
import {TAction} from "./actions";
import {initialState, reducer, TInitialState} from "./reducer";

export const AppContext = createContext<{
    dispatch: React.Dispatch<TAction>,
    state: TInitialState
}>({
    dispatch: () => {
    }, state: initialState
});

const AppContextProvider = ({children}: { children: React.ReactNode }) => {

    const [state, dispatch] = useReducer(reducer, initialState);

    return <AppContext.Provider value={{dispatch, state}}>
        {children}
    </AppContext.Provider>
}

export default AppContextProvider;
