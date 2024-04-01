import {Post, PostDetail} from "../../types";

export enum PostActions {
    SET_POSTS = "SET_POSTS",
    SET_SELECTED_POST = "SET_SELECTED_POST"
}

type SetPostsActionType =  {
    type: PostActions.SET_POSTS,
    payload: Post[]
}

type SetSelectedPostActionType = {
    type: PostActions.SET_SELECTED_POST,
    payload: PostDetail
}

export type PostActionType = SetPostsActionType | SetSelectedPostActionType;
