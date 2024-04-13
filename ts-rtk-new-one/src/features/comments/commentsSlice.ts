import {
    createEntityAdapter,
    createSlice,
    createAsyncThunk,
    PayloadAction,
    EntityState,
    createSelector
} from "@reduxjs/toolkit";
import {TComment, TCommentResponse, TKnownError, TLike, TTag} from "./types";
import axios, {AxiosError} from "axios";
import {RootState} from "../../store";

const COMMENTS_API = "http://localhost:3001/comments"
const COMMENTS_API_WITH_LIMIT = "https://jsonplaceholder.typicode.com/comments?_limit=10"

const commentsAdapter = createEntityAdapter({
    selectId: (comment: TComment) => comment.id
});

// creating tags and likes adapter
const tagsAdapter = createEntityAdapter({
    selectId: (tag: TTag) => tag.id
})

const likesAdapter = createEntityAdapter({
    selectId: (like: TLike) => like.id
})


const initialState = commentsAdapter.getInitialState<
    {
        status: "idle" | "pending" | "succeeded" | "failed",
        error: string | null,
        likes: EntityState<TLike, string>,
        tags: EntityState<TTag, string>
    }
>({
    status: "idle",
    error: null,
    likes: likesAdapter.getInitialState(),
    tags: tagsAdapter.getInitialState()
});


const commentsSlice = createSlice({
    name: "comments",
    initialState,
    reducers: {
        updateLikes: (state, action: PayloadAction<TLike>) => {
            likesAdapter.upsertOne(state.likes, action.payload);
        }
    },
    extraReducers: builder => builder
        .addCase(loadAllComments.pending, (state, action) => {
            state.status = "pending";
        })
        .addCase(loadAllComments.fulfilled, (state, action) => {
            state.status = "succeeded";
            commentsAdapter.upsertMany(state, action.payload.comments);
            tagsAdapter.upsertMany(state.tags, action.payload.tags);
            likesAdapter.upsertMany(state.likes, action.payload.likes);
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
    { comments: TComment[], tags: TTag[], likes: TLike[] },
    void,
    { rejectValue: TKnownError }
>(
    "comments/loadAllCommnets",
    async (_arg, thunkAPI) => {
        try {
            const response = await axios.get<TCommentResponse[]>(COMMENTS_API);
            let tags: TTag[] = response.data.map(c => c.tags).flat();
            let likes: TLike[] = response.data.map(c => c.likes).flat();
            const comments: TComment[] = response.data.map(c => ({
                id: c.id,
                body: c.body,
                tagIds: c.tags.map(c => c.id),
                likeIds: c.likes.map(l => l.id)
            }));
            return {comments, tags, likes};
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
    { rejectValue: TKnownError }
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


export const {
    selectIds: selectTagIds,
    selectEntities: selectTagEntities,
    selectAll: selectAllTags,
    selectById: selectTagById
} = tagsAdapter.getSelectors((state: RootState) => state.comments.tags)

export const {
    selectIds: selectLikeIds,
    selectEntities: selectLikeEntities,
    selectAll: selectAllLikes,
    selectById: selectLikeById
} = likesAdapter.getSelectors((state: RootState) => state.comments.likes)

export const {updateLikes} = commentsSlice.actions;

export const selectTagsForComment = createSelector(
    [selectAllTags, (state, tagIds: string[]) => tagIds],
    (tags, tagIds) => {
        return tags.filter(tag => tagIds.includes(tag.id));
    }
)

export const selectApiState = (state: RootState) => state.comments.status;


export const commentsReducer = commentsSlice.reducer;



