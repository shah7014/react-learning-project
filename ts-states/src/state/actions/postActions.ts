import {Post, PostDetail} from "../../types";
import {Action, PostActions} from "../action-types";
import {Dispatch} from "redux";
import {setError, setIsLoading, setSuccess} from "./appActions";
import axios from "axios";

export const setPosts = (posts: Post[]): Action => {
    return {
        type: PostActions.SET_POSTS,
        payload: posts
    }
}

export const setSelectedPost = (post: PostDetail): Action => {
    return {
        type: PostActions.SET_SELECTED_POST,
        payload: post
    }
}

export const getPosts = () => async (dispatch: Dispatch<Action>) => {
    try {
        dispatch(setIsLoading());
        const response = await axios.get<Post[]>("https://jsonplaceholder.typicode.com/posts");
        dispatch(setPosts(response.data));
        dispatch(setSuccess("Successfully Fetched Posts"))
    } catch (err) {
        dispatch(setError("Error Fetching Posts"))
    } finally {
        dispatch(setIsLoading())
    }
}

