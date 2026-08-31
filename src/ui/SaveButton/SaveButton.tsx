import React from "react";
import saveIcon from '../../assets/save.svg'
import classes from "./SaveButton.module.css";

const SaveButton: React.FC = () => {
    return (
        <button
            type="submit"
            className={classes.editBtn}
        >
            <img
                className={classes.editIcon}
                src={saveIcon}
                alt='save icon'
            />
        </button>
    )
};

export default SaveButton;