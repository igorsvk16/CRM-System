import TodoItem from '../TodoItem/TodoItem.tsx';
import styles from "./TodoList.module.css"
import React, {Dispatch, SetStateAction, useState} from "react";
import {TaskData, TasksData} from "../../type/interface/TasksData.ts";
import {changeTodo} from "../../api/http.ts";

const TodoList: React.FC<{ currentCategoryOfTasks: string, setCurrentCategory: (newState: string) => void, updateTodos: (text: string) => void, currentCategory: string, todoCounter: {todo: number, inProgress: number, review: number, readyForRelease: number, onHold: number,  done: number}, todos: TasksData, isDraggingId: number, currentTitle: string, setIsDraggingId: Dispatch<SetStateAction<number>>, setCurrentTitle: Dispatch<SetStateAction<string>> }> = (props) => {

    // const [ isDraggingId, setIsDraggingId ] = useState<number>();
    // const [ currentTitle, setCurrentTitle ] = useState<string>();
    //
    function handleChangeCategory(categoryName: string, isDraggingId: number, title: string) {
        console.log("categoryName, isDraggingId, title")
        console.log(categoryName, isDraggingId, title)
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
            onDragEnter={() => handleChangeCategory(props.currentCategoryOfTasks, props.isDraggingId, props.currentTitle)}
        >
            <p className={styles.todoCategory}>
                К выполнению {props.currentCategoryOfTasks} ({props.todoCounter.todo})
            </p>
            <section>
                {(props.todos)
                    .filter(todoData => todoData.status === props.currentCategoryOfTasks)
                    .map((todoData: TaskData) => (
                        <TodoItem
                            key={todoData.id}
                            todoData={todoData}
                            updateTodos={props.updateTodos}
                            currentCategory={props.currentCategoryOfTasks}
                            // setIsDraggingId={setIsDraggingId}
                            // setCurrentTitle={setCurrentTitle}
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


// todos: any, updateTodos: (text: string) => void, currentCategory: string, isLoading: boolean, category: string