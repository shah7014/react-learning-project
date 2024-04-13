import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios, {AxiosError} from "axios";
import {RootState} from "../../store";

const USERS_URL = "https://jsonplaceholder.typicode.com/userslo"

type User = {
    id: number,
    name: string,
    username: string
}

const initialState: { state: "idle" | "pending" | "succeeded" | "failed", users: User[], error: string } = {
    state: "idle",
    users: [],
    error: ""
}


const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {},
    extraReducers: builder => builder.addCase(
        getUsers.pending, (state, action) => {
            state.state = "pending";
        }
    ).addCase(getUsers.fulfilled, (state, action) => {
        state.state = "succeeded";
        state.users = action.payload;
    }).addCase(getUsers.rejected, (state, action) => {
        state.state = "failed";
        console.log("payload:-", action.payload?.message);
        console.log("error:-", action.error.message);
        let errorMessage = action.payload?.message || action.error.message || "Something went wrong";
        state.error = errorMessage;
    })
})

export const getUsers = createAsyncThunk<
    User[],
    void,
    {rejectValue: {message: string}}
>(
    "loadUsers",
    async (_arg, thunkApi) => {
        try {
            const response = await axios.get<User[]>(USERS_URL);
            return response.data;
        } catch (err) {
            let error : AxiosError<{message: string}> = err as any;
            if (!error.response) {
                throw error;
            }
            console.log("ERROR:-", error.response);
            return thunkApi.rejectWithValue(error.response.data)
        }
    }
)

export const userReducer = userSlice.reducer;

export const usersSelector = (state: RootState) => state.user.users;

