import React from "react";
import classes from "./CancelButton.module.css";
import closeIcon from '../../assets/close.svg'


const CancelButton: React.FC<({onSelectCancel: () => void})> = (props) => {
    return (
        <button
            className={classes.delBtn}
            onClick={() => props.onSelectCancel()}
        >
            <img
                src={closeIcon}
                className={classes.deleteIcon}
                alt="closeIcon"
                />
        </button>
    )
};

export default CancelButton;