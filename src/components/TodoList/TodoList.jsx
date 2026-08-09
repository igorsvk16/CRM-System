import TodoItem from "../TodoItem/TodoItem.jsx";
import styles from "./TodoList.module.css"

export default function TodoList({ todos, updateTodos, currentCategory, isLoading, checkValidation }) {
    return (
            <section className={styles.todoListContainer}>
                {isLoading && <p className={styles.centeredText}>Загрузка задач...</p>}
                {!isLoading && todos.length === 0 && <p className={styles.centeredText}>Добавьте свою первую задачу</p>}
                {!isLoading && todos.length > 0 && (
                    <section>
                        {(todos).map((todoData) => (
                            <TodoItem
                                key={todoData.id}
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