import {createAsyncThunk, createSlice, PayloadAction, PrepareAction} from "@reduxjs/toolkit";
import {RootState} from "../../state/store";

const initialState = {count: 0};

const counterSlice = createSlice({
    name: "counter",
    initialState,
    reducers: {
        increment: (state) => {
            state.count = state.count + 1;
        },
        decrement: (state) => {
            state.count = state.count - 1;
        },
        incrementBy: {
            reducer: (state, action: PayloadAction<number>) => {
                state.count = state.count + action.payload
            },
            prepare: (num: any) => {
                return {payload: Number(num)}
            }
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(counterAsyncAction.fulfilled, (state, action: PayloadAction<number>) => {
            state.count = state.count + action.payload
        })
    }
});

export const counterAsyncAction = createAsyncThunk(
    "counter/async thunk",
    async (time: number = 2000) => {
        await new Promise((resolve) => setTimeout(resolve, time));
        return 10;
    }
)

const counterReducer = counterSlice.reducer;

export const {
    increment,
    decrement,
    incrementBy
} = counterSlice.actions;

export default counterReducer;

export const counterSelector = (state: RootState) => state.counter.count;
