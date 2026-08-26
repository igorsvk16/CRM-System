import React from "react";
import classes from "./AddButton.module.css";

const AddButton: React.FC<({text: string})> = (props) => {
    return (
    <button className={classes.addButton}>
        {props.text}
    </button>
    )
};

export default AddButton;