import React, {useContext} from 'react';
import {Stack, Typography} from "@mui/material";
import {StyleButton} from "./Button";
import {AppContext} from "../state/AppContext";
import {Actions} from "../state/actions";


const StartScreen: React.FC = () => {

    const {state: {questions}, dispatch} = useContext(AppContext);

    const handleQuizStart = () => {
        dispatch({type: Actions.SET_QUIZ_START})
    }


    return <Stack flexDirection={"column"} alignItems={"center"} sx={{marginTop: "2rem"}}>
        <Typography variant={"h3"} component={"h2"}>Welcome to The React Quiz!</Typography>

        <Typography variant={"h5"} component={"p"} sx={{marginTop: "2rem"}}>{questions.length} questions to
            test</Typography>

        <StyleButton variant="contained" sx={{marginTop: "2rem"}} onClick={handleQuizStart}>Let's Start</StyleButton>
    </Stack>
}

export default StartScreen;

