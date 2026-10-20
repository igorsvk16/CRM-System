import React from "react";
import classes from "./SaveButton.module.css";

const SaveButton: React.FC<{text: string, func?: () => void}> = (props) => {
    return (
        <button
            onClick={props.func}
            type="submit"
            className={classes.saveButton}
        >
            {props.text}
        </button>
    )
};

export default SaveButton;