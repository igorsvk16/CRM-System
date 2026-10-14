import React from "react";
import classes from "./RedTextButton.module.css";


const RedTextButton: React.FC<({text: string, func?: () => void})> = (props) => {
    return (
        <button
            className={classes.delBtn}
            onClick={() => props.func()}
        >
            {props.text}
        </button>
    )
};

export default RedTextButton;