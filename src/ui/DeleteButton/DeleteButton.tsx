import React from "react";
import classes from "./DeleteButton.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'


const TodoCategory: React.FC<({onDelete: () => void})> = (props) => {
    return (
        <button className={classes.delBtn}
                onClick={() => props.onDelete()}
        >
            <FontAwesomeIcon icon={faTrash} />
        </button>
    )
};

export default TodoCategory;