
import { useState } from "react";
import styles from './Task.module.css';
import TodoItem from "./TodoItem.jsx";

export default function TaskList({ tasks, isLoading, loadingText, onHandleDisableEditMode, onEnableEditMode, onSelectStatus, onSelectDelete, editTaskIs, onSelectEditModeCloseNoSave }) {

    const [ editableValue, setEditableValue ] = useState(null);
    console.log(tasks)

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
                            onSelectEditModeCloseNoSave={onSelectEditModeCloseNoSave}
                            onSelectStatus={onSelectStatus}
                            onEnableEditMode={onEnableEditMode}
                            onSelectDelete={onSelectDelete}
                            key={taskData.id}
                        />
                    ))}
                </section>
            )}
        </section>
    )
}