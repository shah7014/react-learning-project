import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch} from "../../state/store";
import {counterSelector, increment, decrement, incrementBy} from "./counterSlice";
import {Button, Stack, TextField, Typography} from "@mui/material";

const Counter = () => {
    const value = useSelector(counterSelector);

    const dispatch = useDispatch<AppDispatch>();

    const [text, setText] = useState(0);

    return <>
        <Typography variant={"h4"}>{value}</Typography>


        <Stack flexDirection={"row"} gap={"1rem"}>
            <Button onClick={() => dispatch(increment())}>Increment</Button>
            <Button onClick={() => dispatch(decrement())}>Decrement</Button>
        </Stack>

        <Stack flexDirection={"row"} alignItems={"center"} marginTop={"1.5rem"} gap={"1rem"}>

            <TextField sx={{width: "50%"}}
                       type={"number"}
                       value={text}
                       onChange={e => setText(+e.target.value)}
            />

            <Button onClick={() => dispatch(incrementBy(text))}>IncrementBy</Button>
        </Stack>

        {/*<Button sx={{marginTop: "2rem"}} variant="contained"*/}
        {/*        onClick={() => dispatch(incrementAsync(13))}>Async Inc</Button>*/}
    </>

}

export default Counter;
