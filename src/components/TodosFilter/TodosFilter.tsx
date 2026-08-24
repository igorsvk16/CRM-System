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
                        className={props.currentCategory === 'all' ? styles.todoCategoryActive : styles.todoCategory}
                        onClick={() => handleChangeCategory('all')}>
                        Все ({props.todoCounter.todo})
                    </button>
                    <button
                        className={props.currentCategory === 'inWork' ? styles.todoCategoryActive : styles.todoCategory}
                        onClick={() => handleChangeCategory('inWork')}>
                        В работе ({props.todoCounter.inProgress})
                    </button>
                    <button
                        className={props.currentCategory === 'completed' ? styles.todoCategoryActive : styles.todoCategory}
                        onClick={() => handleChangeCategory('completed')}>
                        Сделано ({props.todoCounter.done})
                    </button>
        </div>
    )
}

export default TodosFilter;

