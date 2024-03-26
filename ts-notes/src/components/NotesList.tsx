import React from "react";
import {Note} from "../types/types";
import {Box, Button, Card, CardActions, CardContent, Grid, Typography} from "@mui/material";

const NotesList = ({notes, onDeleteNote}: { notes: Note[], onDeleteNote: (title: string) => void}) => {

    const deleteHandler = (title: string) => (e: React.MouseEvent<HTMLButtonElement>) => {
        onDeleteNote(title);
    }

    return <Box sx={{marginTop: "2rem"}}>
        <Typography variant={"h5"}>Notes</Typography>
        <Grid container spacing={2} mt={1}>
            {notes.map((note) =>
                <Grid item xs={12} md={4}>
                    <Card sx={{backgroundColor: note.color}}>
                        <CardContent>
                            <Typography variant={"h6"} gutterBottom>
                                {note.title}
                            </Typography>
                            <Typography variant="body1">
                                {note.description}
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button color={"error"} size="small" onClick={deleteHandler(note.title)}>Delete</Button>
                        </CardActions>
                    </Card>
                </Grid>
            )}
        </Grid>
    </Box>
}

export default NotesList;
