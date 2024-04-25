import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {TPost} from "../posts/types";
import {TUser} from "../users/types";
import {TCity} from "../city/types";

const apiSlice = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:3001/"
    }),
    tagTypes: ['Post', 'User', 'City'],
    endpoints: (builder) => ({
        getPosts: builder.query<TPost[], void>({
            query: () => ({
                url: "/posts",
                method: "GET"
            }),
            providesTags: (result, error, arg) => {
                return result ? [
                        {type: 'Post', id: 'LIST'},
                        ...result.map(r => ({type: 'Post' as const, id: r.id}))
                    ]
                    : [{type: 'Post', id: 'LIST'}]
            }
        }),

        getUsers: builder.query<TUser[], void>({
            query: () => '/users',
            providesTags: (result, err, arg) => {
                return result ? [
                        {type: 'User', id: 'LIST'},
                        ...result.map(r => ({type: 'User' as const, id: r.id}))
                    ] :
                    [{type: 'User', id: 'LIST'}]
            }
        }),

        getSinglePost: builder.query<TPost, string>({
            query: (id: string) => ({
                url: `/posts/${id}`,
                method: "GET"
            }),
            providesTags: (result, error, arg) => ([
                {type: 'Post', id: arg}
            ])
        }),
        createPost: builder.mutation<void, TPost>({
            query: (newPost) => ({
                url: "/posts",
                method: "POST",
                body: newPost
            }),
            invalidatesTags: [{type: 'Post', id: 'LIST'}]
        }),
        editPost: builder.mutation<void, TPost>({
            query: (updatedPost) => ({
                url: `/posts/${updatedPost.id}`,
                method: "PUT",
                body: updatedPost
            }),
            invalidatesTags: (result, error, arg) => ([
                {type: 'Post', id: arg.id}
            ])
        }),


        //     pagination trial
        getCities: builder.query<TCity[], { page: number, limit: number }>({
            query: ({page , limit }) => `/us-counties?_limit=${limit}&_page=${page}`,
            providesTags: (result, error) => {
                return result ?
                    [
                        {type: 'City', id: 'PARTIAL-LIST'},
                        ...result.map(r => ({type: 'City' as const, id: r.id}))
                    ] :
                    [{type: 'City', id: 'PARTIAL-LIST``'}]
            }
        })
    })
})

export const {
    useGetPostsQuery,
    useGetSinglePostQuery,
    useCreatePostMutation,
    useEditPostMutation,
    useGetCitiesQuery
} = apiSlice;

export default apiSlice;

