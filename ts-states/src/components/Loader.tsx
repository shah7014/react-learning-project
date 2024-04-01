import React from "react";
import {useSelector} from "react-redux";
import {CircularProgress} from "@mui/material";
import {RootState} from "../state/store";

const Loader = () => {
    const appState = useSelector((state: RootState) => state.app);

    return <>
        {appState.isLoading && <CircularProgress/>}
    </>
}

export default Loader;

