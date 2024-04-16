import React from 'react';
import {createRoot} from 'react-dom/client';
import {Provider} from 'react-redux';
import {BrowserRouter} from "react-router-dom";
import {store} from './store';
import App from './App';
import {usersExtendedApiSlice} from "./features/users/usersSlice";
import {todosExtendedApiSlice} from "./features/todos/todosSlice";

const container = document.getElementById('root')!;
const root = createRoot(container);


store.dispatch(usersExtendedApiSlice.endpoints?.getAllUsers.initiate());

store.dispatch(todosExtendedApiSlice.endpoints.getAllTodos.initiate())

root.render(
    <React.StrictMode>
        <BrowserRouter>
            <Provider store={store}>
                <App/>
            </Provider>
        </BrowserRouter>
    </React.StrictMode>
);


