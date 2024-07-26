import React, {useReducer} from "react";

enum Actions {
    INCREMENT = "INCREMENT",
    DECREMENT = "DECREMENT",
    RESET = "RESET",
    SET_COUNT = "SET_COUNT",
    SET_STEP = "SET_STEP",
}

type TIncrementAction = {
    type: Actions.INCREMENT;
}

type TDecrementAction = {
    type: Actions.DECREMENT;
}

type TSetAction = {
    type: Actions.SET_COUNT | Actions.SET_STEP;
    payload: number;
}

type TResetAction = {
    type: Actions.RESET;
}

type TCounterAction = TIncrementAction | TDecrementAction | TSetAction | TResetAction;

type TInitialState = {
    count: number;
    step: number;
}

const initialState: TInitialState = {
    count: 0,
    step: 1
}

const reducer = (state = initialState, action: TCounterAction) => {
    switch (action.type) {
        case Actions.INCREMENT: {
            return {
                ...state,
                count: state.count + state.step,
            };
        }
        case Actions.DECREMENT: {
            return {
                ...state,
                count: state.count - state.step,
            }
        }
        case Actions.SET_COUNT: {
            return {
                ...state,
                count: action.payload
            }
        }
        case Actions.SET_STEP: {
            return {
                ...state,
                step: action.payload
            }
        }
        case Actions.RESET: {
            return {
                count: 0,
                step: 1
            }
        }
        default: {
            return state;
        }
    }
}

const DateCounter: React.FC = () => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const {count, step} = state;

    // This mutates the date object.
    const date = new Date("june 21 2027");
    date.setDate(date.getDate() + count);

    const dec = function () {
        dispatch({type: Actions.DECREMENT})
    };

    const inc = function () {
        dispatch({type: Actions.INCREMENT})
    };

    const defineCount = function (e: React.ChangeEvent<HTMLInputElement>) {
        dispatch({type: Actions.SET_COUNT, payload: Number(e.target.value)})
    };

    const defineStep = function (e: React.ChangeEvent<HTMLInputElement>) {
        dispatch({type: Actions.SET_STEP, payload: Number(e.target.value)})
    };

    const reset = function () {
        dispatch({type: Actions.RESET})
    };

    return (
        <div className="counter">
            <div>
                <input
                    type="range"
                    min="0"
                    max="10"
                    value={step}
                    onChange={defineStep}
                />
                <span>{state.step}</span>
            </div>

            <div>
                <button onClick={dec}>-</button>
                <input value={
                    count} onChange={defineCount}/>
                <button onClick={inc}>+</button>
            </div>

            <p>{date.toDateString()}</p>

            <div>
                <button onClick={reset}>Reset</button>
            </div>
        </div>
    );
}

export default DateCounter;
