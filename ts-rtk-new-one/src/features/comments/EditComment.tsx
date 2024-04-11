import React, {useState} from "react";
import {Box, Button, Modal, Stack, TextField} from "@mui/material";
import {TComment} from "./types";
import {useDispatch} from "react-redux";
import {AppDispatch} from "../../store";
import {updateComment} from "./commentsSlice";

const EditComment = ({open = false, onClose, comment}: {open: boolean, onClose: () => void, comment: TComment}) => {

    const [body, setBody] = useState(comment.body);

    const dispatch = useDispatch<AppDispatch>()

    const handleSubmit = () => {
        dispatch(updateComment({...comment, body}))
    }

    return <Modal
        open={open}
        onClose={onClose}
    >
        <Box sx={{
            position: "absolute",
            top: "30%",
            left: "30%",
            width: "800px",
            backgroundColor: theme => theme.palette.background.paper,
            border: '2px solid #000',
            boxShadow: 24,
            padding: "32px",
        }}>
            <Stack
                flexDirection={"column"}
                gap={"1.25rem"}
            >
                <TextField label={"Body"} fullWidth value={body} onChange={e => setBody(e.target.value)} />
                <Button sx={{alignSelf: "flex-start"}} onClick={handleSubmit}>
                    Submit
                </Button>
            </Stack>
        </Box>
    </Modal>
}

export default EditComment;

