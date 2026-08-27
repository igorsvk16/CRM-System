import styles from './TodosFilter.module.css';
import React from "react";

const TodosFilter: React.FC<{currentCategory: string, todoCounter: {todo: number, inProgress: number, done: number}, setCurrentCategory: (newState: string) => void, updateTodos: (text: string) => void}> = (props) => {

    function handleChangeCategory(categoryName: string) {
        props.setCurrentCategory(categoryName);
        props.updateTodos(categoryName);
    }
    return (
        <div className={styles.todosCategories}>
            <button
                className={props.currentCategory === 'todo' ? styles.todoCategoryActive : styles.todoCategory}
                onClick={() => handleChangeCategory('todo')}>
                В работе ({props.todoCounter.todo})
            </button>
            <button
                className={props.currentCategory === 'done' ? styles.todoCategoryActive : styles.todoCategory}
                onClick={() => handleChangeCategory('done')}>
                Сделано ({props.todoCounter.done})
            </button>
        </div>
    )
}

export default TodosFilter;

