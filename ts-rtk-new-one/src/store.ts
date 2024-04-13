import {configureStore} from "@reduxjs/toolkit";
import {userReducer} from "./features/users/userSlice";
import {commentsReducer} from "./features/comments/commentsSlice";
import {contactsApi} from "./services/contactsApi";

export const store = configureStore({
    reducer: {
        user: userReducer,
        comments: commentsReducer,
        [contactsApi.reducerPath]: contactsApi.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(contactsApi.middleware)
})

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
