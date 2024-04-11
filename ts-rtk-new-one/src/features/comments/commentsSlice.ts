import {createEntityAdapter, createSlice, createAsyncThunk, PayloadAction} from "@reduxjs/toolkit";
import {TComment, TKnownError} from "./types";
import axios, {AxiosError} from "axios";
import {RootState} from "../../store";

const COMMENTS_API = "http://localhost:3001/comments"
const COMMENTS_API_WITH_LIMIT = "https://jsonplaceholder.typicode.com/comments?_limit=10"

const commentsAdapter = createEntityAdapter({
    selectId: (comment: TComment) => comment.id
});

const initialState = commentsAdapter.getInitialState<
    { status: "idle" | "pending" | "succeeded" | "failed", error: string | null }
>({
    status: "idle",
    error: null
});


const commentsSlice = createSlice({
    name: "comments",
    initialState,
    reducers: {},
    extraReducers: builder => builder
        .addCase(loadAllComments.pending, (state, action) => {
            state.status = "pending";
        })
        .addCase(loadAllComments.fulfilled, (state, action) => {
            state.status = "succeeded"
            commentsAdapter.upsertMany(state, action.payload);
        })
        .addCase(loadAllComments.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.payload?.message || action.error.message || "OOPS!! something went wrong";
        })
        .addCase(deleteCommentById.fulfilled, (state, action) => {
            state.status = "succeeded";
            commentsAdapter.removeOne(state, action.payload)
        })
        .addCase(updateComment.fulfilled, (state, action) => {
            state.status = "succeeded";
            commentsAdapter.upsertOne(state, action.payload);
        })
});

export const loadAllComments = createAsyncThunk<
    TComment[],
    void,
    { rejectValue: TKnownError }
>(
    "comments/loadAllCommnets",
    async (_arg, thunkAPI) => {
        try {
            const response = await axios.get<TComment[]>(COMMENTS_API);
            return response.data;
        } catch (err) {
            let error: AxiosError<TKnownError> = err as any;
            if (!error.response) {
                throw error;
            }
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
)


export const deleteCommentById = createAsyncThunk<
    string,
    string,
    { rejectValue: TKnownError }
>(
    "comments/deleteCommentById",
    async (commentId, thunkApi) => {
        try {
            const response = await axios.delete(`${COMMENTS_API}/${commentId}`);
            return commentId;
        } catch (err) {
            let error: AxiosError<TKnownError> = err as any;
            if (!error.response) {
                throw err;
            }
            return thunkApi.rejectWithValue(error.response.data);
        }
    }
)

export const updateComment = createAsyncThunk<
    TComment,
    TComment,
    {rejectValue: TKnownError}
>(
    "comments/update",
    async (newComment, thunkApi) => {
        const response = await axios.put<TComment>(`${COMMENTS_API}/${newComment.id}`, newComment);
        return response.data;
    }
)


export const {
    selectIds: selectCommentIds,
    selectById: selectCommentById,
    selectAll: selectAllComments,
} = commentsAdapter.getSelectors((state: RootState) => state.comments);


export const commentsReducer = commentsSlice.reducer;



