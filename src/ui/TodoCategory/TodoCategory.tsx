import React from "react";
import classes from "./TodoCategory.module.css";
import styles from "../../components/TodosFilter/TodosFilter.module.css";

const TodoCategory: React.FC<({currentCategory: string, handleChangeCategory: (categoryName: string) => void, todoCounter: {todo: number, inProgress: number, done: number}, text: string, todoCategory: string})> = (props) => {
    return (
    <button
        className={props.currentCategory === 'todo' ? styles.todoCategoryActive : styles.todoCategory}
        onClick={() => props.handleChangeCategory(props.todoCategory)}
    >
        {props.text} ({props.todoCounter.{props.todoStatus}})
    </button>
    )
};

export default TodoCategory;