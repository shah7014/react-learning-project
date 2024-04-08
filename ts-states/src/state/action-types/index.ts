import {AppActionType, AppActions} from "./appActionTypes";
import {PostActionType, PostActions} from "./postActionTypes";
import {TodoActionType, TodoActions} from "./todoActionTypes";
import {FilterActionType, FilterActions} from "./filterActionTypes";

export type Action = AppActionType | PostActionType | TodoActionType | FilterActionType;

export {AppActions, PostActions, TodoActions, FilterActions}
