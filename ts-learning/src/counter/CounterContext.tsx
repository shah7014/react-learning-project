import React, {createContext, useReducer} from "react";

type Action = {
    type: "INCREMENT" | "DECREMENT",
    payload: number
}

const initialState: { count: number } = {count: 0};

const counterReducer = (state = initialState, action: Action) => {
    switch (action.type) {
        case "INCREMENT": {
            return {
                ...state,
                count: state.count + action.payload
            }
        }
        case "DECREMENT": {
            return {
                ...state,
                count: state.count - action.payload
            }
        }
        default: {
            return state
        }
    }
}


export const CounterContext = createContext<{
    state: { count: number },
    dispatch: React.Dispatch<Action>
}>({
    state: {count: 0}, dispatch: () => {
    }
});


export const CounterContextProvider = ({children}: { children: React.ReactNode }) => {

    const [state, dispatch] = useReducer(counterReducer, initialState);


    return <CounterContext.Provider value={{state, dispatch}}>
        <h3>Counter</h3>
        {children}
    </CounterContext.Provider>
}
