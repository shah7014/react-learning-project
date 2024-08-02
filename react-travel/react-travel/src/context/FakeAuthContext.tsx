import React, {createContext, useContext, useReducer} from "react";
import {TUser} from "../types.ts";
import {TAction} from "./actions/actions.ts";
import {AuthActions} from "./actions/authActions.ts";

type TInitialState = {
    user: TUser | null,
    isAuthenticated: boolean,
}

const initialState: TInitialState = {
    user: null,
    isAuthenticated: false,
}

const FakeAuthContext = createContext<{
    user: TUser | null,
    isAuthenticated: boolean,
    login: (username: string, password: string) => void,
    logout: () => void,
}>
({
    user: null,
    isAuthenticated: false,
    login: () => {
    },
    logout: () => {
    }
});

const reducer = (state = initialState, action: TAction) => {
    switch (action.type) {
        case AuthActions.LOGIN: {
            return {
                ...state,
                user: action.payload,
                isAuthenticated: true
            }
        }
        case AuthActions.LOGOUT: {
            return {
                ...state,
                user: null,
                isAuthenticated: false
            }
        }
        default: {
            return state;
        }
    }
}

const FAKE_USER = {
    name: "Jack",
    email: "jack@example.com",
    password: "qwerty",
    avatar: "https://i.pravatar.cc/100?u=zz",
};

const FakeAuthContextProvider = ({children}: { children: React.ReactNode }) => {

    const [{user, isAuthenticated}, dispatch] = useReducer(reducer, initialState);

    const login = (username: string, password: string) => {
        if (username === FAKE_USER.email && password === FAKE_USER.password) {
            dispatch({type: AuthActions.LOGIN, payload: FAKE_USER});
        }
    }

    const logout = () => {
        dispatch({type: AuthActions.LOGOUT});
    }

    return <FakeAuthContext.Provider value={{user, isAuthenticated, login, logout}}>
        {children}
    </FakeAuthContext.Provider>
}

const useAuthContext = () => {
    const context = useContext(FakeAuthContext);
    if (context === undefined) {
        throw new Error('FakeAuthContext is accessed out of FakeAuthContextProvider');
    }
    return context;
}

export {FakeAuthContextProvider, useAuthContext}

