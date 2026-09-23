import React, { Dispatch, SetStateAction } from "react";
import TodoItem from '../TodoItem/TodoItem.tsx';
import {TodoCounter} from "../../type/interface/TodoCounter.ts";
import { TaskData, TasksData } from "../../type/interface/TasksData.ts";
import { changeTodo } from "../../api/http.ts";
import styles from "./TodoList.module.css";

const TodoList: React.FC<{ currentCategoryOfTasks: string, updateTodos: () => void, todoCounter: TodoCounter, todos: TasksData, isDraggingId: number, currentTitle: string, setCurrentTitle: Dispatch<SetStateAction<string>>, setIsDraggingId: Dispatch<SetStateAction<number>> }> = (props) => {

    const categoriesTitles = {
        todo: "К ВЫПОЛНЕНИЮ ",
        inProgress: "В РАБОТЕ",
        review: "РЕВЬЮ",
        readyForRelease: "ГОТОВО К РЕЛИЗУ",
        onHold: "НА ПАУЗЕ",
        done: "ВЫПОЛНЕНО",
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
            <div className={styles.todoCategory}>
                <p>
                    {categoriesTitles[props.currentCategoryOfTasks as keyof TodoCounter]}
                </p>
                <p className={styles.todoCategoryCounter}>
                    {props.todoCounter[props.currentCategoryOfTasks as keyof TodoCounter]}
                </p>
            </div>
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
                            setCurrentTitle={props.setCurrentTitle}
                            setIsDraggingId={props.setIsDraggingId}
                        />
                    ))}
            </section>
        </div>
    )
}

export default TodoList;