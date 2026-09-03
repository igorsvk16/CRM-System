import styles from './TodosFilter.module.css';
import React from "react";

const TodosFilter: React.FC<{currentCategory: string, todoCounter: {todo: number, inProgress: number, review: number, readyForRelease: number, onHold: number,  done: number}, setCurrentCategory: (newState: string) => void, updateTodos: (text: string) => void}> = (props) => {

    function handleChangeCategory(categoryName: string) {
        props.setCurrentCategory(categoryName);
        props.updateTodos(categoryName);
    }
    return (
        <div className={styles.todosCategories}>
            <button
                className={props.currentCategory === 'todo' ? styles.todoCategoryActive : styles.todoCategory}
                onClick={() => handleChangeCategory('todo')}>
                К выполнению ({props.todoCounter.todo})
            </button>
            <button
                className={props.currentCategory === 'inProgress' ? styles.todoCategoryActive : styles.todoCategory}
                onClick={() => handleChangeCategory('inProgress')}>
                В работе ({props.todoCounter.inProgress})
            </button>
            <button
                className={props.currentCategory === 'review' ? styles.todoCategoryActive : styles.todoCategory}
                onClick={() => handleChangeCategory('review')}>
                Ревью ({props.todoCounter.review})
            </button>
            <button
                className={props.currentCategory === 'readyForRelease' ? styles.todoCategoryActive : styles.todoCategory}
                onClick={() => handleChangeCategory('readyForRelease')}>
                Готово к релизу ({props.todoCounter.readyForRelease})
            </button>
            <button
                className={props.currentCategory === 'onHold' ? styles.todoCategoryActive : styles.todoCategory}
                onClick={() => handleChangeCategory('onHold')}>
                На паузе ({props.todoCounter.onHold})
            </button>
            <button
                className={props.currentCategory === 'done' ? styles.todoCategoryActive : styles.todoCategory}
                onClick={() => handleChangeCategory('done')}>
                Выполнено ({props.todoCounter.done})
            </button>
        </div>
    )
}

export default TodosFilter;

