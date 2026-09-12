import {useState} from "react";
import styles from './TodosFilter.module.css';
import React from "react";
import TodoItem from "../TodoItem/TodoItem.tsx";
import {TaskData, TasksData} from "../../type/interface/TasksData.ts";
import {deleteTodo} from "../../api/http.ts";
import {changeTodo} from "../../api/http.ts";

const TodosFilter: React.FC<{currentCategory: string, todoCounter: {todo: number, inProgress: number, review: number, readyForRelease: number, onHold: number,  done: number}, setCurrentCategory: (newState: string) => void, updateTodos: (text: string) => void, todos: TasksData, isLoading: boolean}> = (props) => {

    const [ isDraggingId, setIsDraggingId ] = useState<number>();
    const [ currentTitle, setCurrentTitle ] = useState<string>();

    function handleChangeCategory(categoryName: string, isDraggingId: number, title: string) {
        props.setCurrentCategory(categoryName);
        props.updateTodos(categoryName);
        console.log("isDraggingId, categoryName");
        console.log(isDraggingId, categoryName, title);
        changeTodo(isDraggingId, categoryName, title)
            .then(() => {
                props.updateTodos(props.currentCategory);
            }, reason => {
                alert("Ошибка обновления статуса задачи");
                alert(reason);
            })
    }

    return (
        <>
        <div className={styles.todosCategories}>
            <div
                className={styles.tasksColumn}
                onDragEnter={() => handleChangeCategory('todo', isDraggingId, currentTitle)}
            >
            <button
                className={props.currentCategory === 'todo' ? styles.todoCategoryActive : styles.todoCategory}
                onClick={() => handleChangeCategory('todo', isDraggingId, currentTitle)}>
                К выполнению ({props.todoCounter.todo})
            </button>
                {props.isLoading && <p className={styles.centeredText}>Загрузка задач...</p>}
                {!props.isLoading && props.todos.length === 0 && <p className={styles.centeredText}>Добавьте свою первую задачу</p>}
                {!props.isLoading && props.todos.length > 0 && (
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
                )}
            </div>
            <div
                className={styles.tasksColumn}
                onDragEnter={() => handleChangeCategory('inProgress', isDraggingId, currentTitle)}
            >
            <button
                className={props.currentCategory === 'inProgress' ? styles.todoCategoryActive : styles.todoCategory}
                onClick={() => handleChangeCategory('inProgress')}>
                В работе ({props.todoCounter.inProgress})
            </button>
                {props.isLoading && <p className={styles.centeredText}>Загрузка задач...</p>}
                {!props.isLoading && props.todos.length === 0 && <p className={styles.centeredText}>Добавьте свою первую задачу</p>}
                {!props.isLoading && props.todos.length > 0 && (
                    <section>
                        {(props.todos)
                            .filter(todoData => todoData.status === "inProgress")
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
                )}
            </div>
            <div className={styles.tasksColumn}
                 onDragEnter={(e) => handleChangeCategory('review', isDraggingId, currentTitle)}>
            <button
                className={props.currentCategory === 'review' ? styles.todoCategoryActive : styles.todoCategory}
                onClick={() => handleChangeCategory('review')}>
                Ревью ({props.todoCounter.review})
            </button>
                {props.isLoading && <p className={styles.centeredText}>Загрузка задач...</p>}
                {!props.isLoading && props.todos.length === 0 && <p className={styles.centeredText}>Добавьте свою первую задачу</p>}
                {!props.isLoading && props.todos.length > 0 && (
                    <section>
                        {(props.todos)
                            .filter(todoData => todoData.status === "review")
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
                )}
            </div>
            <div className={styles.tasksColumn}
                 onDragEnter={() => handleChangeCategory('readyForRelease', isDraggingId, currentTitle)}>
            <button
                className={props.currentCategory === 'readyForRelease' ? styles.todoCategoryActive : styles.todoCategory}
                onClick={() => handleChangeCategory('readyForRelease')}>
                Готово к релизу ({props.todoCounter.readyForRelease})
            </button>
                {props.isLoading && <p className={styles.centeredText}>Загрузка задач...</p>}
                {!props.isLoading && props.todos.length === 0 && <p className={styles.centeredText}>Добавьте свою первую задачу</p>}
                {!props.isLoading && props.todos.length > 0 && (
                    <section>
                        {(props.todos)
                            .filter(todoData => todoData.status === "readyForRelease")
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
                )}
            </div>
            <div className={styles.tasksColumn}
                 onDragEnter={() => handleChangeCategory('onHold', isDraggingId, currentTitle)}>
            <button
                className={props.currentCategory === 'onHold' ? styles.todoCategoryActive : styles.todoCategory}
                onClick={() => handleChangeCategory('onHold')}>
                На паузе ({props.todoCounter.onHold})
            </button>
                {props.isLoading && <p className={styles.centeredText}>Загрузка задач...</p>}
                {!props.isLoading && props.todos.length === 0 && <p className={styles.centeredText}>Добавьте свою первую задачу</p>}
                {!props.isLoading && props.todos.length > 0 && (
                    <section>
                        {(props.todos)
                            .filter(todoData => todoData.status === "onHold")
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
                )}
            </div>
            <div className={styles.tasksColumn}
                 onDragEnter={(e) => handleChangeCategory('done', isDraggingId, currentTitle)}>
            <button
                className={props.currentCategory === 'done' ? styles.todoCategoryActive : styles.todoCategory}
                onClick={() => handleChangeCategory('done')}>
                Выполнено ({props.todoCounter.done})
            </button>
                {props.isLoading && <p className={styles.centeredText}>Загрузка задач...</p>}
                {!props.isLoading && props.todos.length === 0 && <p className={styles.centeredText}>Добавьте свою первую задачу</p>}
                {!props.isLoading && props.todos.length > 0 && (
                    <section>
                        {(props.todos)
                            .filter(todoData => todoData.status === "done")
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
                )}
            </div>
        </div>
        </>
    )
}

export default TodosFilter;

