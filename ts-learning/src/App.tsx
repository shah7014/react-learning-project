import React from 'react';
import './App.css';
import PosList from "./posts/PosList";
import ParentChild from "./wrapper/ParentChild";
import NewPost from "./posts/NewPost";
import {CounterContextProvider} from "./counter/CounterContext";
import Counter from "./counter/Counter";

function App() {
  return (
    <div className="App">
      <PosList />
      {/*  <ParentChild />*/}
        <NewPost />
        <CounterContextProvider>
            <Counter />
        </CounterContextProvider>
    </div>
  );
}

export default App;
