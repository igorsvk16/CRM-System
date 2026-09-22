import React, {Dispatch, SetStateAction} from "react";
import {TasksData} from "../../type/interface/TasksData.ts";
import TodoList from "../TodoList/TodoList.tsx";
import {TodoCounter} from "../../type/interface/TodoCounter.ts";
import styles from './TodosFilter.module.css';

const TodosFilter: React.FC<{todoCounter: TodoCounter, updateTodos: () => void, todos: TasksData, isLoading: boolean, isDraggingId: number, currentTitle: string, setIsDraggingId: Dispatch<SetStateAction<number>>, setCurrentTitle: Dispatch<SetStateAction<string>> }> = (props) => {


    const tasksStatuses = ['todo', 'inProgress', "review", "readyForRelease", "onHold", "done"];

    return (
        <>
        {props.isLoading && <p className={styles.centeredText}>Загрузка задач...</p>}
        {!props.isLoading && props.todos.length === 0 && <p className={styles.centeredText}>Добавьте свою первую задачу</p>}
        {!props.isLoading && props.todos.length > 0 && (
                <div className={styles.todosCategories}>
                    {tasksStatuses.map((tasksStatus: string) =>
                        (
                            <TodoList
                                key={tasksStatus}
                                currentCategoryOfTasks={tasksStatus}
                                updateTodos={props.updateTodos}
                                todoCounter={props.todoCounter}
                                todos={props.todos}
                                isDraggingId={props.isDraggingId}
                                currentTitle={props.currentTitle}
                                setIsDraggingId={props.setIsDraggingId}
                                setCurrentTitle={props.setCurrentTitle}
                            />
                        ))
                    }
                </div>
            )
        }
        </>
    )
}

export default TodosFilter;

