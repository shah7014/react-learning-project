import React, {useContext} from "react";
import {AppContext} from "../state/AppContext";
import {Stack, Typography} from "@mui/material";
import {StyleButton} from "./Button";
import {Actions} from "../state/actions";


const FinishScreen: React.FC = () => {

    const {state: {score}, dispatch} = useContext(AppContext);

    const handleStartAgain = () => {
        dispatch({type: Actions.SET_QUIZ_START});
    }

    return <Stack
        flexDirection={"column"}
        gap={"1rem"}
    >
        <Typography variant={"h5"}>You have scored {score} points</Typography>
        <StyleButton onClick={handleStartAgain}>Start Again</StyleButton>
    </Stack>
}

export default FinishScreen;
