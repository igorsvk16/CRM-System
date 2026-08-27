import React from "react";
import classes from "./Mark.module.css";

const Mark: React.FC<({onSelectStatus: () => void, checked: boolean})> = (props) => {
    return (
        <input
            type="checkbox"
            className={classes.checkboxStatusTodo}
            onChange={() => props.onSelectStatus()}
            checked={props.checked}
        />
    )
};

export default Mark;