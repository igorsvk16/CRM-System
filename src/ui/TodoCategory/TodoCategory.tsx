import React, {ReactNode} from "react";
import classes from "./TodoCategory.module.css";

const TodoCategory: React.FC<({currentCategory: string, handleChangeCategory: (categoryName: string) => void, category: string, children: ReactNode})> = (props) => {
    return (
    <button
        className={props.currentCategory === props.category ? classes.todoCategoryActive : classes.todoCategory}
        onClick={() => props.handleChangeCategory(props.category)}
    >
        {props.children}
    </button>
    )
};

export default TodoCategory;