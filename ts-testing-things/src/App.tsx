import React from 'react';
import {Container, createTheme, CssBaseline, ThemeProvider} from "@mui/material";
import CounterOld from "./components/counter-old/CounterOld";


function App() {

    let theme = createTheme({
        palette: {
            background: {default: "#f7f2e9"}
        }
    })

    return <ThemeProvider theme={theme}>
        <CssBaseline />
        <Container maxWidth={"md"} sx={{marginTop: "2rem"}}>
            <CounterOld />
        </Container>
    </ThemeProvider>
}

export default App;
