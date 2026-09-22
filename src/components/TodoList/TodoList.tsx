import React, { Dispatch, SetStateAction } from "react";
import TodoItem from '../TodoItem/TodoItem.tsx';
import {TodoCounter} from "../../type/interface/TodoCounter.ts";
import { TaskData, TasksData } from "../../type/interface/TasksData.ts";
import { changeTodo } from "../../api/http.ts";
import styles from "./TodoList.module.css";

const TodoList: React.FC<{ currentCategoryOfTasks: string, updateTodos: () => void, todoCounter: TodoCounter, todos: TasksData, isDraggingId: number, currentTitle: string, setIsDraggingId: Dispatch<SetStateAction<number>>, setCurrentTitle: Dispatch<SetStateAction<string>> }> = (props) => {

    const categoriesTitles = {
        todo: "К выполнению",
        inProgress: "В работе",
        review: "Ревью",
        readyForRelease: "Готово к релизу",
        onHold: "На паузе",
        done: "Выполнено",
    }

    function handleChangeCategory(categoryName: string, isDraggingId: number, title: string) {
        props.updateTodos();

        changeTodo(isDraggingId, categoryName, title)
            .then(() => {
                props.updateTodos();
            }, reason => {
                alert("Ошибка обновления статуса задачи");
                alert(reason);
            })
    }

    return (
        <div
            className={styles.tasksColumn}
            onDragEnter={() => handleChangeCategory(props.currentCategoryOfTasks, props.isDraggingId, props.currentTitle)}
            onDragOver={(e) => e.preventDefault()}
        >
            <p className={styles.todoCategory}>
                {categoriesTitles[props.currentCategoryOfTasks as keyof TodoCounter]} {props.todoCounter[props.currentCategoryOfTasks as keyof TodoCounter]}
            </p>
            <section>
                {(props.todos)
                    .filter(todoData => todoData.status === props.currentCategoryOfTasks)
                    .map((todoData: TaskData) => (
                        <TodoItem
                            key={todoData.id}
                            todoData={todoData}
                            updateTodos={props.updateTodos}
                            isDraggingId={props.isDraggingId}
                            currentTitle={props.currentTitle}
                            setIsDraggingId={props.setIsDraggingId}
                            setCurrentTitle={props.setCurrentTitle}
                        />
                    ))}
            </section>
        </div>
    )
}

export default TodoList;