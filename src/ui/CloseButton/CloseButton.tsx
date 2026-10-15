import React from "react";
import classes from "./CloseButton.css";


const CloseButton: React.FC<({text: string, func?: () => void})> = (props) => {
    return (
        <button
            className={classes.delBtn}
            onClick={() => props.func()}
        >
            {props.text}
        </button>
    )
};

export default CloseButton;