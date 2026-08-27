import React from "react";
import classes from "./EditButton.module.css";
import editIcon from '../../assets/edit.svg';

const TodoCategory: React.FC<({onEdit: () => void})> = (props) => {
    return (
        <button className={classes.editBtn}
                onClick={() => props.onEdit()}
        >
            <img className={classes.editIcon} src={editIcon} alt="editIcon" />
        </button>
    )
};

export default TodoCategory;