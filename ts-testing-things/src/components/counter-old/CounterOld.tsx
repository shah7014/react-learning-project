import React, {useState} from "react";
import {Box, IconButton, Stack, TextField, Typography} from "@mui/material";
import {Add, Remove, RestartAlt} from "@mui/icons-material";
import {useSelector, useDispatch} from "react-redux"
import {decrementCount, incrementCount, resetCount} from "../../state/actions/counterActions";
import {Dispatch} from "redux";
import {Action} from "../../state/action-types";

const CounterOld: React.FC = () => {

    const [changeBy, setChangeBy] = useState(0);

    const count: number = useSelector((state: any) => state.count.count);

    const dispatch: Dispatch<Action> = useDispatch();

    return <>
        <Stack flexDirection={"column"} alignItems={"center"} gap={"1.5rem"}>
            <Typography variant={"h3"}>{count}</Typography>

            <TextField
                label={"Increment by"}
                placeholder={"Enter value..."}
                value={changeBy}
                type={"number"}
                sx={{width: "50%"}}
                onChange={e => setChangeBy(Number(e.target.value))}
            />

            <Box>
                <IconButton onClick={() => dispatch(incrementCount(changeBy))}>
                    <Add/>
                </IconButton>
                <IconButton sx={{marginLeft: "1rem"}}
                            onClick={() => dispatch(decrementCount(changeBy))}>
                    <Remove/>
                </IconButton>
                <IconButton sx={{marginLeft: "1rem"}}
                            onClick={() => dispatch(resetCount())}>
                    <RestartAlt/>
                </IconButton>
            </Box>
        </Stack>
    </>
}

export default CounterOld;

