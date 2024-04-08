import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Post, User} from "../../types";
import {RootState} from "../../state/store";

const initialState: { users: User[] } = {users: []}

const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(loadUsers.fulfilled, (state, action: PayloadAction<User[]>) => {
            state.users = action.payload;
        })
    }
})

export const loadUsers = createAsyncThunk(
    "users/loadUsers",
    async () => {
        try {
            const response = await fetch("https://jsonplaceholder.typicode.com/users");
            if (!response.ok) {
                throw new Error("Something went wrong")
            }
            const data: User[] = await response.json();
            return data;

        } catch (err) {
            // if (err instanceof Error)
            // @ts-ignore
            return err.message;
            // else return {message: "Its not right"};
        }
    }
);

export const usersSelector = (state: RootState) => state.users.users;
export const userByIdSelector = (state: RootState, id: number) => state.users.users.find(u => u.id === id);

export default usersSlice.reducer;

