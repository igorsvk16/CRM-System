import styles from './TodosFilter.module.css';
import React from "react";

const TodosFilter: React.FC<{currentCategory: string, todoCounter: {all: number, inWork: number, completed: number}, setCurrentCategory: (newState: string) => void, updateTodos: (text: string) => void}> = (props) => {

    function handleChangeCategory(categoryName: string) {
        props.setCurrentCategory(categoryName);
        props.updateTodos(categoryName);
    }

    return (
        <div className={styles.todosCategories}>
                    <button
                        className={props.currentCategory === 'all' ? styles.todoCategoryActive : styles.todoCategory}
                        onClick={() => handleChangeCategory('all')}>
                        {/*Все ({props.todoCounter.all})*/}
                    </button>
                    <button
                        className={props.currentCategory === 'inWork' ? styles.todoCategoryActive : styles.todoCategory}
                        onClick={() => handleChangeCategory('inWork')}>
                        {/*В работе ({props.todoCounter.inWork})*/}
                    </button>
                    <button
                        className={props.currentCategory === 'completed' ? styles.todoCategoryActive : styles.todoCategory}
                        onClick={() => handleChangeCategory('completed')}>
                        {/*Сделано ({props.todoCounter.completed})*/}
                    </button>
        </div>
    )
}

export default TodosFilter;

