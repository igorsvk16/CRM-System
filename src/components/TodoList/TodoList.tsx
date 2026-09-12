import TodoItem from '../TodoItem/TodoItem.tsx';
import styles from "./TodoList.module.css"
import React, {useState} from "react";
import {TaskData, TasksData} from "../../type/interface/TasksData.ts";
import {changeTodo} from "../../api/http.ts";

const TodoList: React.FC<{ currentCategoryOfTasks: string, setCurrentCategory: (newState: string) => void, updateTodos: (text: string) => void, currentCategory: string, todoCounter: {todo: number, inProgress: number, review: number, readyForRelease: number, onHold: number,  done: number}, todos: TasksData }> = (props) => {

    const [ isDraggingId, setIsDraggingId ] = useState<number>();
    const [ currentTitle, setCurrentTitle ] = useState<string>();

    function handleChangeCategory(categoryName: string, isDraggingId: number, title: string) {
        props.setCurrentCategory(categoryName);
        props.updateTodos(categoryName);
        changeTodo(isDraggingId, categoryName, title)
            .then(() => {
                props.updateTodos(props.currentCategory);
            }, reason => {
                alert("Ошибка обновления статуса задачи");
                alert(reason);
            })
    }

    return (
        <div
            className={styles.tasksColumn}
            onDragEnter={() => handleChangeCategory('todo', isDraggingId, currentTitle)}
        >
            <p className={styles.todoCategory}>
                К выполнению ({props.todoCounter.todo})
            </p>
            <section>
                {(props.todos)
                    .filter(todoData => todoData.status === "todo")
                    .map((todoData: TaskData) => (
                        <TodoItem
                            key={todoData.id}
                            todoData={todoData}
                            updateTodos={props.updateTodos}
                            currentCategory={props.currentCategory}
                            setIsDraggingId={setIsDraggingId}
                            setCurrentTitle={setCurrentTitle}
                        />
                    ))}
            </section>
        </div>
    )
}

export default TodoList;


// todos: any, updateTodos: (text: string) => void, currentCategory: string, isLoading: boolean, category: string