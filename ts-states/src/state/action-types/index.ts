import {AppActionType, AppActions} from "./appActionTypes";
import {PostActionType, PostActions} from "./postActionTypes";

export type Action = AppActionType | PostActionType;

export {AppActions, PostActions}
