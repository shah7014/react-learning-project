import React from 'react';
import HtmlForm from "./html-form/HtmlForm";
import {fetchUsers} from "./lib/users-api";

fetchUsers();

function App() {
    return (
        <div>
            <HtmlForm/>
        </div>
    );
}

export default App;
