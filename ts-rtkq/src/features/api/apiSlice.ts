import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {TTodo} from "../../model/Todo";

export const apiSlice = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:3001"
    }),
    tagTypes: ["todos"],
    endpoints: build => ({
        getAllTodos: build.query<TTodo[], void>({
            query: (_arg) => "/todos",
            providesTags: ["todos"]
        }),
        getTodo: build.query<TTodo, string>({
           query: (id) => `/todos/${id}`
        }),
        createTodo: build.mutation<void, TTodo>({
            query: (todo) => ({
                method: "POST",
                url: "/todos",
                body: todo
            }),
            invalidatesTags: ["todos"]
        }),
        updateTodo: build.mutation<void, TTodo>({
            query: (todo) => ({
                method: "PUT",
                url: `/todos/${todo.id}`,
                body: todo
            }),
            invalidatesTags: ["todos"]
        }),
        deleteTodo: build.mutation<void, string>({
            query: (todoId) => ({
                method: "DELETE",
                url: `/todos/${todoId}`
            }),
            invalidatesTags: ["todos"]
        })
    })
})

export const {
    useGetAllTodosQuery,
    useGetTodoQuery,
    useCreateTodoMutation,
    useUpdateTodoMutation,
    useDeleteTodoMutation
} = apiSlice;

