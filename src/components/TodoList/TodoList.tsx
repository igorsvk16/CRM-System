import TodoItem from '../TodoItem/TodoItem';
import styles from "./TodoList.module.css"
import React from "react";

const TodoList: React.FC<{ todos: any, updateTodos: (text: string) => void, currentCategory: string, isLoading: boolean }> = (props) => {
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

// export default function TodoList({ todos, updateTodos, currentCategory, isLoading }) {
//     return (
//         <section className={styles.todoListContainer}>
//             {isLoading && <p className={styles.centeredText}>Загрузка задач...</p>}
//             {!isLoading && todos.length === 0 && <p className={styles.centeredText}>Добавьте свою первую задачу</p>}
//             {!isLoading && todos.length > 0 && (
//                 <section>
//                     {(todos).map((todoData) => (
//                         <TodoItem
//                             key={todoData.id}
//                             todoData={todoData}
//                             updateTodos={updateTodos}
//                             currentCategory={currentCategory}
//                         />
//                     ))}
//                 </section>
//             )}
//         </section>
//     )
// }