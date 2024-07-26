import {CircularProgress, styled} from "@mui/material";

export const Loader = styled(CircularProgress)({
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'lightgray',
    opacity: 0.6,
    zIndex: 8999,
})