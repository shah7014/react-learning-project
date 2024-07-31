import React from "react";

import styles from "./Button.module.css";

interface IProps {
    children: React.ReactNode,
    type: "primary" | "back" | "position",
    onClick: (e: React.MouseEvent) => void,
    btnType?: 'button' | 'submit'
}


const Button: React.FC<IProps> = ({children, type, onClick, btnType = 'button'}) => {
    return <button
        onClick={onClick}
        type={btnType}
        className={`${styles.btn} ${styles[type]}`}
    >{children}</button>
}

export default Button;


