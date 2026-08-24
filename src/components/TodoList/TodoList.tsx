import TodoItem from '../TodoItem/TodoItem.tsx';
import styles from "./TodoList.module.css"
import React from "react";

const TodoList: React.FC<{ todos: any, updateTodos: (text: string) => void, currentCategory: string, isLoading: boolean }> = (props) => {
    console.log(props.todos)
    return (
            <section className={styles.todoListContainer}>
                {props.isLoading && <p className={styles.centeredText}>Загрузка задач...</p>}
                {!props.isLoading && props.todos.length === 0 && <p className={styles.centeredText}>Добавьте свою первую задачу</p>}
                {!props.isLoading && props.todos.length > 0 && (
                    <section>
                        {(props.todos).map((todoData: { id: any; title: string; isDone: boolean; }) => (
                            <TodoItem
                                key={todoData.id}
                                todoData={todoData}
                                updateTodos={props.updateTodos}
                                currentCategory={props.currentCategory}
                            />
                        ))}
                    </section>
                )}
            </section>
    )
}

export default TodoList;