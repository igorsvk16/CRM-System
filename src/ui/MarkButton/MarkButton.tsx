import React from "react";
import classes from "./MarkButton.module.css";

const MarkButton: React.FC<({onSelectStatus: (isDone: boolean) => void, checked: boolean})> = (props) => {
    return (
        <input
            type="checkbox"
            className={classes.checkboxStatusTodo}
            onChange={() => props.onSelectStatus(props.checked)}
            checked={props.checked}
        />
    )
};

export default MarkButton;