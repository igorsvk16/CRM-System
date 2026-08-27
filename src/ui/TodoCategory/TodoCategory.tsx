import React from "react";
import classes from "./TodoCategory.module.css";
import styles from "../../components/TodosFilter/TodosFilter.module.css";

type Props = {
    children: React.ReactNode;
};

const TodoCategory: React.FC<({currentCategory: string, handleChangeCategory: (categoryName: string) => void, category: string, props: Props})> = (props) => {
    return (
    <button
        className={props.currentCategory === 'todo' ? styles.todoCategoryActive : styles.todoCategory}
        onClick={() => props.handleChangeCategory(props.category)}
    >
        {props.children}
    </button>
    )
};

export default TodoCategory;