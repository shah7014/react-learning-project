import {useReducer} from "react";
import {Box, Button, Container, Input, Slider, Stack, Typography} from "@mui/material";

enum Actions {
    SET_COUNT,
    SET_STEP,
    INCREMENT_COUNT,
    DECREMENT_COUNT,
    RESET_ALL

}

type TInitialState = {
    count: number;
    step: number;
}

type TSetCountAction = {
    type: Actions.SET_COUNT;
    payload: number;
}

type TSetStepAction = {
    type: Actions.SET_STEP;
    payload: number;
}

type TIncrementCountAction = {
    type: Actions.INCREMENT_COUNT;
}

type TDecrementCountAction = {
    type: Actions.DECREMENT_COUNT;
}

type TResetAction = {
    type: Actions.RESET_ALL
}

type TAction = TSetCountAction | TSetStepAction | TIncrementCountAction | TDecrementCountAction | TResetAction;

const initialState: TInitialState = {
    step: 1,
    count: 0,
}

const reducer = (state = initialState, action: TAction) => {
    switch (action.type) {
        case Actions.SET_COUNT: {
            return {
                ...state,
                count: action.payload,
            }
        }
        case Actions.SET_STEP: {
            return {
                ...state,
                step: action.payload,
            }
        }
        case Actions.INCREMENT_COUNT: {
            return {
                ...state,
                count: state.count + state.step
            }
        }
        case Actions.DECREMENT_COUNT: {
            return {
                ...state,
                count: state.count - state.step
            }
        }
        case Actions.RESET_ALL: {
            return initialState
        }
        default: {
            return state;
        }
    }
}



function DateCounterNew() {
    const [state, dispatch] = useReducer(reducer, initialState);

    // This mutates the date object.
    const date = new Date("june 21 2027");
    date.setDate(date.getDate() + state.count);

    const handleDecrementCount = function () {
        dispatch({type: Actions.DECREMENT_COUNT});
    };

    const handleIncrementCount = function () {
        dispatch({type: Actions.INCREMENT_COUNT})
    };

    const handleCountChange = function (e: React.ChangeEvent<HTMLInputElement>) {
        dispatch({type: Actions.SET_COUNT, payload: Number(e.target.value)})
    };

    const handleStepChange = function (e: any, value: number | number[]) {
        if(typeof value === "number") {
            dispatch({type: Actions.SET_STEP, payload: Number(e.target.value)})
        }
    };

    const reset = function () {
        dispatch({type: Actions.RESET_ALL});
    };

    return (
        <>
            <Container maxWidth={"lg"} sx={{padding: "1rem"}}>
                <Stack
                    direction="column"
                    alignItems="center"
                    justifyContent="center"
                    gap={"1.5rem"}
                >
                    {/*Stepper*/}
                    <Stack direction={"row"} gap={"0.5rem"} alignItems={"center"}>

                        <Box sx={{flex: 3}}>
                            <Slider
                                value={state.step}
                                onChange={handleStepChange}
                                min={0}
                                max={10}
                                size={"small"}
                                step={1}
                                marks
                                aria-labelledby="discrete-slider"
                                valueLabelDisplay="auto"
                            />
                        </Box>
                        <Typography variant={"body1"}>{state.step}</Typography>
                    </Stack>

                {/*    Count*/}
                    <Stack direction={"row"} gap={"1rem"} alignItems={"center"}>
                        <Button onClick={handleDecrementCount}>-</Button>
                        <Input
                            value={state.count}
                            onChange={handleCountChange}
                        />
                        <Button onClick={handleIncrementCount}>+</Button>
                    </Stack>

                {/*    Date*/}
                    <Typography variant={"h5"}>{date.toString()}</Typography>
                </Stack>
            </Container>
        </>
    );
}

export default DateCounterNew;
