import React, {useContext, useState} from "react";
import {CounterContext} from "./CounterContext";

const Counter = () => {

    const [changeBy, setChangeBy] = useState<number>(0);

    const {state, dispatch} = useContext(CounterContext)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setChangeBy(Number(e.target.value));
    }

    const handleIncrement = (e: React.MouseEvent<HTMLButtonElement>) => {
        dispatch({type: "INCREMENT", payload: changeBy})
    }

    const handleDecrement = (e: React.MouseEvent<HTMLButtonElement>) => {
        dispatch({type: "DECREMENT", payload: changeBy});
    }

    return <>
        <h3>Counter: {state.count}</h3>
        <input type={"number"} step={1} value={changeBy} onChange={handleChange}/>
        <button onClick={handleIncrement}>Increment</button>
        <button onClick={handleDecrement}>Decrement</button>
    </>
}

export default Counter

