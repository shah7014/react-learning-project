import {apiSlice} from "../api/apiSlice";
import {createSelector, createEntityAdapter, EntityAdapter, EntityState} from "@reduxjs/toolkit";
import {TUser} from "../../model/User";
import {RootState} from "../../store";

const usersAdapter = createEntityAdapter({
    selectId: (user: TUser) => user.id
})

const initialState = usersAdapter.getInitialState();

export const usersExtendedApiSlice = apiSlice.injectEndpoints({
    endpoints: build => ({
        getAllUsers: build.query<EntityState<TUser>, void>({
            query: () => "/users",
           transformResponse: (response: TUser[]): EntityState<TUser> => {
                return usersAdapter.setAll(initialState, response);
           }
        })
    })
})

export const selectUseResult = usersExtendedApiSlice.endpoints?.getAllUsers.select();

const emptyUsers: TUser[] = [];

export const selectUserData = createSelector(
    selectUseResult,
    userResult => userResult.data
)

// export const selectUserById = createSelector(
//     selectAllUsers,
//     (state: RootState, id: number) => id,
//     (users, userId) => users.find(u => u.id === userId)
// )

export const {
    selectById: selectUserById,
    selectAll: selectAllUsers
} = usersAdapter.getSelectors((state: RootState) => selectUserData(state) ?? initialState);
