import React, {useContext, useEffect} from 'react';
import {Container, createTheme, CssBaseline, responsiveFontSizes, Stack, styled, ThemeProvider} from "@mui/material";

import reactLogo from "./images/react.png"
import StartScreen from "./components/StartScreen";
import {Loader} from "./components/Loader";
import {Actions} from "./state/actions";
import {AppStates} from "./components/types";
import {AppContext} from "./state/AppContext";
import QuizScreen from "./components/QuizScreen";
import FinishScreen from "./components/FinishScreen";

const StyledContainer = styled(Container)({
    marginTop: "3.2rem",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
})

const Logo = styled('img')(({theme}) => ({
    display: "none",
    width: "10rem",

    [theme.breakpoints.up("md")]: {
        display: "block"
    }
}))

const StyledHeading = styled("h1")({
    fontFamily: "Codystar",
    color: '#f1f3f5;',
    fontWeight: 400,
    fontStyle: 'normal',
    textTransform: 'uppercase',
    fontSize: '3.3rem'
})


const App = () => {

    const {state, dispatch} = useContext(AppContext);
    const numberOfQuestions = state.questions.length;

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const res = await fetch("http://localhost:8080/questions");
                if (!res.ok) {
                    throw new Error("Error Loading Questions")
                }
                const questions = await res.json();
                dispatch({type: Actions.SET_READY, payload: questions});
            } catch (err) {
                console.log("ERROR:-", err);
                dispatch({type: Actions.SET_ERROR})
            }
        }

        fetchQuestions();
    }, []);

    let theme = createTheme({
        palette: {
            background: {
                default: '#343a40',
                paper: '#495057'
            },
            text: {
                primary: '#f1f3f5'
            },
        }
    });
    theme = responsiveFontSizes(theme);

    return (

        <ThemeProvider theme={theme}>
            <CssBaseline/>
            {state.status === AppStates.LOADING && <Loader/>}
            <StyledContainer maxWidth={'md'}>

                <Stack
                    flexDirection={"row"}
                    gap={"2rem"}
                    alignItems={"center"}
                >
                    <Logo src={reactLogo} alt={"React Logo"}/>
                    <StyledHeading>The React Quiz</StyledHeading>
                </Stack>

                {state.status === AppStates.READY && <StartScreen/>}
                {state.status === AppStates.ACTIVE && <QuizScreen/>}
                {state.status === AppStates.FINISHED && <FinishScreen/>}

            </StyledContainer>
        </ThemeProvider>


    );
}

export default App;
