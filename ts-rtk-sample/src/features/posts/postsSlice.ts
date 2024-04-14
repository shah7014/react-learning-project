import {createSelector, createEntityAdapter} from "@reduxjs/toolkit";
import {Post, ReactionsType} from "../../types";
import {apiSlice} from "../api/apiSlice";
import {RootState} from "../../state/store";


const postsAdapter = createEntityAdapter({
    selectId: (post: Post) => post.id,
    sortComparer: (a, b) => b.date.localeCompare(a.date)
});

const initialState = postsAdapter.getInitialState();

const postsSlice = apiSlice.injectEndpoints({
    endpoints: build => ({
        getAllPosts: build.query({
            query: () => "/posts"
        })
    })
})


export const {
    selectIds: selectAllPostIds,
    selectEntities,
    selectTotal,
    selectAll: selectAllPosts,
    selectById: selectPostById
} = postsAdapter.getSelectors((state: RootState) => state.posts);





