import React, {useContext} from "react";
import {AppContext} from "../state/AppContext";
import {Box, LinearProgress, Stack, Typography} from "@mui/material";
import {StyleButton} from "./Button";
import {Actions} from "../state/actions";
import Timer from "./Timer";

const QuizScreen: React.FC = () => {

    const {state: {questions, currentQuestionNumber, score, maxScore, newAnswer}, dispatch} = useContext(AppContext);

    const {question, points, correctOption, options} = questions[currentQuestionNumber];
    const progress = ((currentQuestionNumber) / questions.length) * 100;

    const handleVerifyAnswer = (optionSelected: number) => () => {
        dispatch({type: Actions.SET_ANSWER, payload: optionSelected})
    }

    const handleNextClick = () => {
        dispatch({type: Actions.GO_TO_NEXT})
    }

    const handleFinishClick = () => {
        dispatch({type: Actions.SET_QUIZ_FINISHED});
    }

    return <Box sx={{marginTop: "1.5rem", width: "70%"}}>

        {/*    Progress bar + question no + score */}
        <Stack
            flexDirection={"column"}
            gap={"0.75rem"}
        >
            <LinearProgress value={progress} variant={"determinate"}/>

            <Stack
                flexDirection={"row"}
                justifyContent={"space-between"}
            >
                <Typography variant={"h6"}>Question <span
                    style={{fontWeight: "bold"}}>{currentQuestionNumber + 1}</span> / {questions.length}</Typography>
                <Typography variant={"h6"}>
                    <span style={{fontWeight: "bold"}}>{score}</span> / {maxScore}
                </Typography>
            </Stack>
        </Stack>

        {/*    Question + options*/}
        <Stack sx={{marginTop: "2rem"}}
               flexDirection={"column"}
        >
            <Typography variant={"h5"} sx={{marginBottom: "1.25rem"}}>{question}</Typography>

            <Stack
                flexDirection={"column"}
                gap={"0.75rem"}
            >
                {options.map((option, index) => <StyleButton
                    disabled={newAnswer !== null}
                    key={option} textAlign={"left"}
                    onClick={handleVerifyAnswer(index)}
                    bgColor={newAnswer === null ? "default" : (index === correctOption ? "primary" : "warning")}
                >
                    {option}
                </StyleButton>)}
            </Stack>
        </Stack>

        {/*    Timer + Next button*/}
        <Stack
            flexDirection={"row"}
            justifyContent={"space-between"}
            alignItems={"center"}
            sx={{marginTop: "2rem"}}
        >

            <Timer />

            {(newAnswer !== null && questions.length > currentQuestionNumber + 1) &&
                <StyleButton onClick={handleNextClick}>Next</StyleButton>}
            {(newAnswer !== null && questions.length === currentQuestionNumber + 1) &&
                <StyleButton onClick={handleFinishClick}>Finish</StyleButton>}
        </Stack>
    </Box>
}


export default QuizScreen;
