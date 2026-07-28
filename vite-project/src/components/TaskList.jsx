
import { useState } from "react";
import styles from './Task.module.css';
import TodoItem from "./TodoItem.jsx";

export default function TaskList({ tasks, isLoading, loadingText, updateTasks, currentCategory }) {
    return (
        <section className="tasks-category">
            {isLoading && <p className="fallback-text">{loadingText}</p>}
            {!isLoading && tasks.length === 0 && <p className="fallback-text">Добавьте свою первую задачу</p>}
            {!isLoading && tasks.length > 0 && (
                <section className={styles.tasks}>
                    {(tasks).map((taskData) => (
                        <TodoItem
                            taskData={taskData}
                            key={taskData.id}
                            updateTasks={updateTasks}
                            currentCategory={currentCategory}
                        />
                    ))}
                </section>
            )}
        </section>
    )
}