import {apiSlice} from "../api/apiSlice";
import {TTodo} from "../../model/Todo";
import {createEntityAdapter, createSelector, EntityState} from "@reduxjs/toolkit";
import {sub} from "date-fns";
import {RootState} from "../../store";

const todosAdapter = createEntityAdapter({
    selectId: (todo: TTodo) => todo.id
})

const initialState = todosAdapter.getInitialState();

export const todosExtendedApiSlice = apiSlice.injectEndpoints({
    endpoints: build => ({
        getAllTodos: build.query<EntityState<TTodo>, void>({
            query: (_arg) => "/todos",
            transformResponse: (result: TTodo[], error, arg) => {
                let min = 1;
                const loadedTodos = result.map(todo => {
                    if (!todo.date) {
                        todo.date = sub(new Date(), {minutes: min++}).toISOString();
                    }
                    if (!todo.reactions) {
                        todo.reactions = {
                            thumbsUp: 0,
                            wow: 0,
                            heart: 0,
                            rocket: 0,
                            coffee: 0
                        }
                    }
                    return todo;
                });
                return todosAdapter.setAll(initialState, loadedTodos);
            },
            providesTags: (result, error, arg) => {
                return result ? [
                        {type: "Todo", id: "LIST"},
                        ...result.ids.map((id) => ({type: "Todo" as const, id}))
                    ] :
                    [{type: "Todo", id: "LIST"}]
            }
        }),
        getTodo: build.query<TTodo, string>({
            query: (id) => `/todos/${id}`,
            providesTags: (result, error, arg) => (
                [{type: "Todo", id: arg}]
            )
        }),
        createTodo: build.mutation<void, TTodo>({
            query: (todo) => ({
                method: "POST",
                url: "/todos",
                body: {
                    ...todo,
                    userId: Number(todo.userId),
                    date: new Date().toISOString(),
                    reactions: {
                        thumbsUp: 0,
                        wow: 0,
                        heart: 0,
                        rocket: 0,
                        coffee: 0
                    }
                }
            }),
            invalidatesTags: [{type: "Todo", id: "LIST"}]
        }),
        updateTodo: build.mutation<void, TTodo>({
            query: (todo) => ({
                method: "PUT",
                url: `/todos/${todo.id}`,
                body: {
                    ...todo,
                    date: new Date().toISOString()
                }
            }),
            invalidatesTags: (result, error, arg) => ([
                {type: "Todo", id: arg.id}
            ])
        }),
        deleteTodo: build.mutation<void, string>({
            query: (todoId) => ({
                method: "DELETE",
                url: `/todos/${todoId}`
            }),
            invalidatesTags: (result, error, arg) => [{type: "Todo", id:arg}]
        }),
        getTodosByUserId: build.query<EntityState<TTodo>, number>({
            query: (userId) => `/todos/?userId=${userId}`,
            transformResponse: (result: TTodo[], error ,arg) => {
                let min = 1;
                const loadedTodos = result.map(todo => {
                    if (!todo.date) {
                        todo.date = sub(new Date(), {minutes: min++}).toISOString();
                    }
                    if (!todo.reactions) {
                        todo.reactions = {
                            thumbsUp: 0,
                            wow: 0,
                            heart: 0,
                            rocket: 0,
                            coffee: 0
                        }
                    }
                    return todo;
                });
                return todosAdapter.setAll(initialState, loadedTodos);
            },
            providesTags: (result, error, arg) => {
                return result ? [
                    {type: "Todo", is: "LIST"},
                    ...result.ids.map(id => ({type: "Todo" as const, id}))
                ] : [{type: "Todo", id: "LIST"}]
            }
        })
    })
})


export const {
    useGetAllTodosQuery,
    useGetTodoQuery,
    useCreateTodoMutation,
    useUpdateTodoMutation,
    useDeleteTodoMutation,
    useGetTodosByUserIdQuery,
    useLazyGetAllTodosQuery
} = todosExtendedApiSlice;

const selectTodosResultData = todosExtendedApiSlice.endpoints.getAllTodos.select();

const selectTodosData = createSelector(
    selectTodosResultData,
    (result) => result.data
)

export const {
    selectIds: selectAllTodoIds,
    selectEntities,
    selectAll: selectAllTodos,
    selectById: selectTodoById
} = todosAdapter.getSelectors((state: RootState) => selectTodosData(state) ?? initialState)
