import {configureStore} from "@reduxjs/toolkit";
import {userReducer} from "./features/users/userSlice";
import {commentsReducer} from "./features/comments/commentsSlice";

export const store = configureStore({
    reducer: {
        user: userReducer,
        comments: commentsReducer
    }
})

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
