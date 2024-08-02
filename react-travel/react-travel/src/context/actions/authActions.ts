import {TUser} from "../../types.ts";

export enum AuthActions {
    LOGIN = 'LOGIN',
    LOGOUT = 'LOGOUT'
}

type TLoginAction = {
    type: AuthActions.LOGIN,
    payload: TUser
}

type TLogoutAction = {
    type: AuthActions.LOGOUT
}

export type TAuthActions = TLoginAction | TLogoutAction;

