import styles from './TodosFilter.module.css';
import React from "react";
import TodoCategory from "../../ui/TodoCategory/TodoCategory.tsx";

const TodosFilter: React.FC<{currentCategory: string, todoCounter: {todo: number, inProgress: number, done: number}, setCurrentCategory: (newState: string) => void, updateTodos: (text: string) => void}> = (props) => {

    function handleChangeCategory(categoryName: string) {
        props.setCurrentCategory(categoryName);
        props.updateTodos(categoryName);
    }
    return (
        <div className={styles.todosCategories}>
            <TodoCategory
            currentCategory={props.currentCategory}
            handleChangeCategory={handleChangeCategory}
            category="todo"
            >
                В работе ({props.todoCounter.todo})
            </TodoCategory>
            <TodoCategory
                currentCategory={props.currentCategory}
                handleChangeCategory={handleChangeCategory}
                category="done"
            >
                Сделано ({props.todoCounter.done})
            </TodoCategory>
        </div>
    )
}

export default TodosFilter;

