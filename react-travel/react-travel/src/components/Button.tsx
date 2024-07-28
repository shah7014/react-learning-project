import React from "react";

import styles from "./Button.module.css";

interface IProps {
    children: React.ReactNode,
    type: "primary" | "back",
    onClick: (e: React.MouseEvent) => void
}


const Button: React.FC<IProps> = ({children, type, onClick}) => {
    return <button
        onClick={onClick}
        className={`${styles.btn} ${styles[type]}`}
    >{children}</button>
}

export default Button;


