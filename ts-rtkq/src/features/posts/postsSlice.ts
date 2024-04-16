import {apiSlice} from "../api/apiSlice";
import {TPost} from "../../model/Post";
import {sub} from "date-fns";
import {createEntityAdapter, EntityState} from "@reduxjs/toolkit";
import {TTodo} from "../../model/Todo";

const postsAdapter = createEntityAdapter({
    selectId: (post: TPost) => post.id,
});

const initialState = postsAdapter.getInitialState()

const postsExtendedSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getAllPosts: builder.query<EntityState<TPost>, void>({
            query: () => "/posts",
            transformResponse: (response: TPost[], error, arg) => {
                let min = 5;
                const loadedPosts = response.map(post => {
                    if (!post.date) {
                        post.date = sub(new Date(), {minutes: min++}).toISOString();
                    }
                    if (!post.reactions) {
                        post.reactions = {
                            thumbsUp: 0,
                            wow: 0,
                            heart: 0,
                            rocket: 0,
                            coffee: 0
                        }
                    }
                    return post;
                })
                return postsAdapter.setAll(initialState, loadedPosts);
            },
            providesTags: (result, error, arg) => {
                return result ? [
                    {type: "Post", id: "LIST"},
                    ...result.ids.map(id => ({id, type: "Post" as const}))
                ] : [{type: "Post", id: "LIST"},]
            }
        }),
        getPostsByUserId: builder.query<EntityState<TPost>, string>({
            query: (userId) => `/posts/?userId=${userId}`,
            transformResponse: (result: TPost[], error ,arg) => {
                let min = 1;
                const loadedPosts = result.map(post => {
                    if (!post.date) {
                        post.date = sub(new Date(), {minutes: min++}).toISOString();
                    }
                    if (!post.reactions) {
                        post.reactions = {
                            thumbsUp: 0,
                            wow: 0,
                            heart: 0,
                            rocket: 0,
                            coffee: 0
                        }
                    }
                    return post;
                });
                return postsAdapter.setAll(initialState, loadedPosts);
            },
            providesTags: (result, error, arg) => {
                return result ? [
                    {type: "Todo", is: "LIST"},
                    ...result.ids.map(id => ({type: "Todo" as const, id}))
                ] : [{type: "Todo", id: "LIST"}]
            }
        })
    })
});

export const {
    useGetAllPostsQuery,
    useGetPostsByUserIdQuery
} = postsExtendedSlice;

