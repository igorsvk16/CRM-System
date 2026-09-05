import styles from './TodosFilter.module.css';
import React from "react";
import TodoItem from "../TodoItem/TodoItem.tsx";
import {TaskData, TasksData} from "../../type/interface/TasksData.ts";

const TodosFilter: React.FC<{currentCategory: string, todoCounter: {todo: number, inProgress: number, review: number, readyForRelease: number, onHold: number,  done: number}, setCurrentCategory: (newState: string) => void, updateTodos: (text: string) => void, todos: TasksData, isLoading: boolean}> = (props) => {

    console.log("props.todos");
    // console.log(props.todos);
    // console.log(props.todos.filter(todo => todo.status === "todo"));


    function handleChangeCategory(categoryName: string) {
        props.setCurrentCategory(categoryName);
        props.updateTodos(categoryName);
    }
    return (
        <>
        <div className={styles.todosCategories}>
            <div className={styles.tasksColumn}>
            <button
                className={props.currentCategory === 'todo' ? styles.todoCategoryActive : styles.todoCategory}
                onClick={() => handleChangeCategory('todo')}>
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
                            />
                        ))}
                    </section>
                )}
            </div>

            <div>
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
                                />
                            ))}
                    </section>
                )}
            </div>
            <div>
            <button
                className={props.currentCategory === 'review' ? styles.todoCategoryActive : styles.todoCategory}
                onClick={() => handleChangeCategory('review')}>
                Ревью ({props.todoCounter.review})
            </button>
                <div className={styles.todoContainer}>
                    <p>tsertet</p>
                    <p>tsertet</p>
                    <p>tsertet</p>
                </div>
            </div>
            <div>
            <button
                className={props.currentCategory === 'readyForRelease' ? styles.todoCategoryActive : styles.todoCategory}
                onClick={() => handleChangeCategory('readyForRelease')}>
                Готово к релизу ({props.todoCounter.readyForRelease})
            </button>
                <div className={styles.todoContainer}>
                    <p>tsertet</p>
                    <p>tsertet</p>
                    <p>tsertet</p>
                </div>
            </div>
            <div>
            <button
                className={props.currentCategory === 'onHold' ? styles.todoCategoryActive : styles.todoCategory}
                onClick={() => handleChangeCategory('onHold')}>
                На паузе ({props.todoCounter.onHold})
            </button>
                <div className={styles.todoContainer}>
                    <p>tsertet</p>
                    <p>tsertet</p>
                    <p>tsertet</p>
                </div>
            </div>
            <div>
            <button
                className={props.currentCategory === 'done' ? styles.todoCategoryActive : styles.todoCategory}
                onClick={() => handleChangeCategory('done')}>
                Выполнено ({props.todoCounter.done})
            </button>
                <div className={styles.todoContainer}>
                    <p>tsertet</p>
                    <p>tsertet</p>
                    <p>tsertet</p>
                </div>
            </div>
        </div>
        {/*<div className={styles.todoColumn}>*/}
        {/*    <div className={styles.todoContainer}>*/}
        {/*        <p>sadas</p>*/}
        {/*        <p>sadas</p>*/}
        {/*        <p>sadas</p>*/}
        {/*    </div>*/}
        {/*</div>*/}

        </>
    )
}

export default TodosFilter;

