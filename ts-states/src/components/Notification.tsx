import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {Alert, Snackbar} from "@mui/material";
import {setError, setSuccess} from "../state/actions/appActions";
import {AppDispatch, RootState} from "../state/store";
import {Dispatch} from "redux";

const Notification = () => {

    const notifyState = useSelector((state: RootState) => state.app);
    const successState = notifyState.success;
    const errorState = notifyState.error;

    const dispatch: AppDispatch = useDispatch()

    const handleSuccessClose = () => {
        dispatch(setSuccess())
    }

    const handleErrorClose = () => {
        dispatch(setError())
    }

    return <>
        {successState.canShow && <Snackbar
            anchorOrigin={{vertical: "top", horizontal: "right"}}
            open={successState.canShow}
            autoHideDuration={4000}
            onClose={handleSuccessClose}
        >
            <Alert severity={"success"} variant={"filled"} onClose={handleSuccessClose}>
                {successState.message}
            </Alert>
        </Snackbar>}
        {errorState.canShow && <Snackbar
            anchorOrigin={{vertical: "top", horizontal: "right"}}
            open={errorState.canShow}
            autoHideDuration={4000}
            onClose={handleErrorClose}
        >
            <Alert severity={"error"} variant={"filled"} onClose={handleErrorClose}>
                {errorState.message}
            </Alert>
        </Snackbar>}
    </>

}

export default Notification;
