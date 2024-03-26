import React, {useState} from "react";
import {Box, Button, Stack, TextField, Typography} from "@mui/material";
import {Note} from "../types/types";

const NewNoteForm = ({onNoteAdd}: {onNoteAdd: (note: Note) => void}) => {


    const [newNote, setNewNote] = useState<Note>({
        title: "", description: "", color: "#a1a1a1"
    });

    const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onNoteAdd(newNote);
    }

    const inputTextChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewNote(val => ({
            ...val,
            [e.target.name]: e.target.value
        }));
    }

    return <Box sx={{marginTop: "1rem"}}>
        <Stack component={"form"} onSubmit={submitHandler} sx={{flexDirection: "column", gap: "2rem"}}>
            <Typography variant={"h5"}>Create Note</Typography>
            <TextField variant={"outlined"} label={"Notes title"}
                       placeholder={"Enter title of the note here..."}
                       name={"title"}
                       value={newNote.title} onChange={inputTextChangeHandler}/>
            <TextField variant={"outlined"} label={"Notes Description"}
                       placeholder={"Enter description of the note here..."} multiline rows={4}
                       name={"description"}
                       value={newNote.description} onChange={inputTextChangeHandler}/>
            <input type={"color"}
                   name={"color"}
                   value={newNote.color} onChange={inputTextChangeHandler}/>
            <Button variant={"contained"}
                    color={"primary"}
                    type={"submit"} sx={{alignSelf: "flex-start"}}>
                Submit
            </Button>
        </Stack>
    </Box>
}

export default NewNoteForm;

