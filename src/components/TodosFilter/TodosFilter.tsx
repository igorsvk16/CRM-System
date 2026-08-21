import styles from './TodosFilter.module.css';
import React from "react";

const TodosFilter: React.FC<{currentCategory: string, todoCounter, setCurrentCategory, updateTodos: (text: string) => void}> = (props) => {

    function handleChangeCategory(categoryName) {
        setCurrentCategory(categoryName);
        props.updateTodos(categoryName);
    }

    return (
        <div className={styles.todosCategories}>
                    <button
                        className={props.currentCategory === 'all' ? styles.todoCategoryActive : styles.todoCategory}
                        onClick={() => handleChangeCategory('all')}>
                        Все ({todoCounter.all})
                    </button>
                    <button
                        className={props.currentCategory === 'inWork' ? styles.todoCategoryActive : styles.todoCategory}
                        onClick={() => handleChangeCategory('inWork')}>
                        В работе ({todoCounter.inWork})
                    </button>
                    <button
                        className={props.currentCategory === 'completed' ? styles.todoCategoryActive : styles.todoCategory}
                        onClick={() => handleChangeCategory('completed')}>
                        Сделано ({todoCounter.completed})
                    </button>
        </div>
    )
}

export default TodosFilter;

