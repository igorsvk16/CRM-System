import React from "react";
import classes from "./SaveButton.module.css";

const SaveButton: React.FC = () => {
    return (
        <button
            type="submit"
            className={classes.saveButton}
        >
            Добавить
        </button>
    )
};

export default SaveButton;