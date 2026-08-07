import TodoItem from "../TodoItem/TodoItem.jsx";
import styles from "./TodoList.module.css"

export default function TodoList({ tasks, updateTodos, currentCategory, isLoading, checkValidation }) {
    return (
            <section className="tasks-category">
                {isLoading && <p className={styles.centeredText}>Загрузка задач...</p>}
                {!isLoading && tasks.length === 0 && <p className={styles.centeredText}>Добавьте свою первую задачу</p>}
                {!isLoading && tasks.length > 0 && (
                    <section>
                        {(tasks).map((todoData) => (
                            <TodoItem
                                todoData={todoData}
                                updateTodos={updateTodos}
                                currentCategory={currentCategory}
                                checkValidation={checkValidation}
                            />
                        ))}
                    </section>
                )}
            </section>
    )

}