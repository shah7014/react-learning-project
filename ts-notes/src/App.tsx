import React, {useState} from 'react';
import {
    AppBar,
    Container,
    createTheme,
    CssBaseline,
    responsiveFontSizes,
    ThemeProvider,
    Toolbar,
    Typography
} from "@mui/material";
import NewNoteForm from "./components/NewNoteForm";
import {Note} from "./types/types";
import NotesList from "./components/NotesList";

function App() {
    let theme = createTheme({
        palette: {
            background: {
                default: "#f7f2e9"
            }
        }
    })

    theme = responsiveFontSizes(theme);

    const [notes, setNotes] = useState<Note[]>([]);

    const noteAddHandler = (newNote: Note) => {
        console.log("NEWNOTE", newNote)
        setNotes(prev => ([...prev, newNote]))
    }

    const noteDeleteHandler = (title: string) => {
        setNotes(prev => prev.filter(n => n.title !== title));
    }


    return (
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <AppBar position={"sticky"} sx={{top: 0}}>
                <Toolbar>
                    <Typography variant={"h4"}>Sample App</Typography>
                </Toolbar>
            </AppBar>
            <Container maxWidth={"lg"}>
                {notes.length ? <NotesList notes={notes} onDeleteNote={noteDeleteHandler} />: <></>}
                <NewNoteForm onNoteAdd={noteAddHandler}/>
            </Container>
        </ThemeProvider>
    );
}

export default App;
