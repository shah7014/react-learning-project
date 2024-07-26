import {Button, styled} from "@mui/material";

interface IButtonProps {
    textAlign?: "center" | "left",
    bgColor?: "default" | "primary" | "warning"
}

export const StyleButton = styled(Button, {
    shouldForwardProp: propName => propName !== 'textAlign' && propName !== 'bgColor'
})<IButtonProps>(({theme, textAlign = "center", bgColor = "default"}) => ({
    borderRadius: `${theme.shape.borderRadius * 25}px`,
    backgroundColor: bgColor === "default" ? theme.palette.background.paper : theme.palette[bgColor].main,
    border: '2px solid ' + theme.palette.background.paper,
    transition: '0.3s',
    textTransform: 'none',
    padding: '1rem 2rem',
    fontSize: '1.25rem',
    justifyContent: textAlign === "left" ? "flex-start" : "center",
    color: "#fff",

    "&:hover": {
        backgroundColor: theme.palette.background.default,
    },

    "&:disabled": {
        cursor: "not-allowed"
    }
}));

