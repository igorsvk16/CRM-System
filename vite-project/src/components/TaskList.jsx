
import { useState } from "react";
import styles from './Task.module.css';
import TodoItem from "./TodoItem.jsx";

export default function TaskList({ tasks, isLoading, loadingText, onHandleDisableEditMode, editTaskIs, updateTasks, currentCategory, setEditTaskIs }) {

    const [ editableValue, setEditableValue ] = useState(null);

    return (
        <section className="tasks-category">
            {isLoading && <p className="fallback-text">{loadingText}</p>}
            {!isLoading && tasks.length === 0 && <p className="fallback-text">Добавьте свою первую задачу</p>}
            {!isLoading && tasks.length > 0 && (
                <section className={styles.tasks}>
                    {(tasks).map((taskData) => (
                        <TodoItem
                            taskData={taskData}
                            editTaskIs={editTaskIs}
                            editableValue={editableValue}
                            setEditableValue={setEditableValue}
                            onHandleDisableEditMode={onHandleDisableEditMode}
                            key={taskData.id}
                            updateTasks={updateTasks}
                            currentCategory={currentCategory}
                            setEditTaskIs={setEditTaskIs}
                        />
                    ))}
                </section>
            )}
        </section>
    )
}