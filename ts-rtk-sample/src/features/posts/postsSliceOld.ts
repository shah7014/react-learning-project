import {createAsyncThunk, createSelector, createSlice, PayloadAction, createEntityAdapter} from "@reduxjs/toolkit";
import {Post, ReactionsType} from "../../types";
import {RootState} from "../../state/store";
import axios, {AxiosError} from "axios";

type PostState = {
    status: "idle" | "pending" | "succeeded" | "failed",
    posts: Post[],
    error: any
}

const postsAdapter = createEntityAdapter({
    selectId: (post: Post) => post.id
});

const newInitialState = postsAdapter.getInitialState<{
    status: "idle" | "pending" | "succeeded" | "failed",
    error: any
}>({
    status: "idle",
    error: null
})

// const initialState: PostState = {status: "idle", posts: [], error: null}

const postsSlice = createSlice({
    name: "posts",
    initialState: newInitialState,
    reducers: {
        addReaction: (state, action: PayloadAction<{ reactionName: ReactionsType, postId: number }>) => {
            const {reactionName, postId} = action.payload;
            // const post = state.posts.find(p => p.id === postId);
            // if (!!post) {
            //     post.reactions[reactionName]++;
            // }
            const post = state.entities[postId];
            if (post) {
                post.reactions[reactionName]++;
            }
        }
    },
    extraReducers: builder => {
        builder.addCase(loadPosts.pending, (state) => {
            state.status = "pending";
        }).addCase(loadPosts.fulfilled, (state, action: PayloadAction<Post[]>) => {
            state.status = "succeeded";
            const posts = action.payload.map(p => ({
                ...p,
                reactions: {
                    thumbsUp: 0,
                    rocket: 0,
                    coffee: 0,
                }
            }));
            postsAdapter.upsertMany(state, posts);
        }).addCase(loadPosts.rejected, (state, action) => {
            console.log("CATCHING rejected one", action.payload, action.error)
            state.status = "failed";
            // state.error = action.error.message
            // state.error = action.payload?.message;
            if (action.payload) {
                state.error = action.payload.message
            } else {
                state.error = action.error.message
            }
        }).addCase(addPost.fulfilled, (state, action: PayloadAction<Omit<Post, "reactions">>) => {
            const p: Post = {...action.payload, reactions: {thumbsUp: 0, rocket: 0, coffee: 0}}
            postsAdapter.addOne(state, p);
        })
            .addCase(updatedPost.pending, (state) => {
                state.status = "pending"
            })
            .addCase(updatedPost.fulfilled, (state, action) => {
                console.log("UPDATED POST IN THUNK:-", action.payload);
                state.status = "succeeded";
                postsAdapter.upsertOne(state, action.payload)
            })
            .addCase(updatedPost.rejected, (state, action) => {
                state.error = action.payload?.message;
                console.log("ERROR IN THUNK:- ", action.payload?.message);
            })
    }
});

export const loadPosts = createAsyncThunk<
    Post[],
    void,
    { rejectValue: { message: string } }
>(
    "posts/loadPosts",
    async (_arg, thunkAPI) => {
        try {
            const response = await axios.get<Post[]>("https://jsonplaceholder.typicode.com/posts");
            return response.data;
        } catch (err) {
            // if (err instanceof Error)
            // @ts-ignore
            // return "something went wrong";
            // else return {message: "Its not right"};

            // TODO: above all won't work. Use the below ones
            // return Promise.reject("Something went wrong")
            // return Promise.reject(new Error("Something went wrong"))

            // TODO: do this in case of actual scenario
            // let error: AxiosError<{ message: string }> = err;
            // if (!error.response) {
            //     throw err;
            // }
            // return thunkAPI.rejectWithValue(error.response.data);

            return thunkAPI.rejectWithValue({message: "Hello"})
        }
    }
)

export const addPost = createAsyncThunk(
    "posts/addPost",
    async (post: any) => {
        // try {
        const response = await axios.post<Post>("https://jsonplaceholder.typicode.com/posts", post);
        return response.data;

        // } catch (err) {
        //     // if (err instanceof Error)
        //     // @ts-ignore
        //     return "";
        //     // else return {message: "Its not right"};
        // }
    }
)

export const updatedPost = createAsyncThunk<
    Post,
    Partial<Post>,
    { rejectValue: { message: string } }
>(
    "posts/editPost",
    async (post: Partial<Post>, thunkAPI) => {
        try {
            const response = await axios.put(`https://jsonplaceholder.typicode.com/posts/${post.id}`, post);
            return response.data;
        } catch (err) {
            return thunkAPI.rejectWithValue({message: "Error editing post"})
        }
    }
)

export const {
    selectIds: selectAllPostIds,
    selectEntities,
    selectTotal,
    selectAll: selectAllPosts,
    selectById: selectPostById
} = postsAdapter.getSelectors((state: RootState) => state.posts);


// TODO: Issue here is the filter always generates a new copy, so need to use memoized selector
// export const postByUserIdSelector = (state: RootState, userId: number) => {
//     return state.posts.entities.filter(p => p.userId === userId);
// }

export const postsByUserIdMemoizedSelector = createSelector(
    [selectAllPosts, (state, userId) => userId],
    (allPosts, userId) => {
        return allPosts.filter(p => p.userId === userId);
    }
)

export const {addReaction} = postsSlice.actions;


export default postsSlice.reducer;

