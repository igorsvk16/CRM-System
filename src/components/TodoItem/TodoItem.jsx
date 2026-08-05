import { useState } from "react";
import { changeTodo, deleteTaskById } from "../../api/http.js";
import styles from './TodoItem.module.css';
import editIcon from '../../assets/edit.png';
import trashIcon from '../../assets/trash-bin.png';
import saveIcon from '../../assets/icons8-save-50.png';
import closeIcon from '../../assets/close.png'


export default function TodoItem({taskData, updateTodos, currentCategory}) {

    const [ editTaskIs, setEditTaskIs ] = useState("");
    const [ editableValue, setEditableValue ] = useState(null);


    async function onSelectDelete(id) {
        try {
            await deleteTaskById(id);
        } catch (error) {
            alert("Не получилось удалить задачу");
        }
        updateTodos(currentCategory);
    }

    async function onEnableEditMode(task) {
        // если обновлять задачу - не работает
        updateTodos(currentCategory)
        setEditTaskIs(task)

    }

    async function onSelectEditModeCloseNoSave() {
        setEditTaskIs(null);
        updateTodos(currentCategory);
    }

    async function onSelectStatus(isDone, id, title) {
        let newStatus = !isDone;
        try {
            await changeTodo(id, newStatus, title);
        } catch (error) {
            alert("Ошибка обновления статуса задачи");
        }
        updateTodos(currentCategory);
    }

    async function onHandleDisableEditMode(id, isDone, taskInput, taskData) {
        if (taskInput.trim().length >= 2 && taskInput.trim().length <= 64) {
            try {
                await changeTodo(id, isDone, taskInput);
            } catch (error) {
                alert("Не получилось отредактировать задачу")
            }
            taskData.title = taskInput;
            setEditTaskIs(null);
            updateTodos(currentCategory);
        } else {
            if (taskInput.trim().length >= 2) {
                alert("Максимальная длина текста 64 символа")
            } else if (taskInput.trim().length === 1) {
                alert("Минимальная длина текста 2 символа");
            } else {
                alert("Введите текст, не пробелы")
            }
        }
    }

    return (
        (+editTaskIs === taskData.id) ?
            (<div className={styles.taskDiv} key={taskData.id}>
                    <li key={taskData.id} className={styles.task}>
                        <div className={styles.notCheckbox}></div>
                        <input
                            type="text"
                            value={editableValue}
                            readOnly={false}
                            autoFocus
                            onChange={(e) => setEditableValue(e.target.value)}
                        />
                        <button
                            className={styles.editBtn}
                            onClick={() =>{{
                                onHandleDisableEditMode(taskData.id, taskData.isDone, editableValue, taskData);
                            }}
                            }
                        >
                            <img className={styles.editIcon} src={saveIcon} alt="editIcon" />
                        </button>
                        <button className={styles.delBtn} onClick={() =>
                            onSelectEditModeCloseNoSave()
                        }>
                            <img
                                src={closeIcon}
                                className={styles.deleteIcon}
                                alt="closeIcon"
                            />
                        </button>
                    </li>
                </div>
            ) : (
                <div className={styles.taskDiv} key={taskData.id}>
                    <li key={taskData.id} className={styles.task}>
                        <input
                            type="checkbox"
                            onChange={() => onSelectStatus(taskData.isDone, taskData.id, taskData.title)}
                            checked={taskData.isDone}
                            className={styles.checkboxStatusTask}
                        />
                        <input
                            value={taskData.title}
                            type="text"
                            readOnly={true}
                            className={taskData.isDone? styles.taskTitleDone : styles.taskTitleUndone}
                        />
                        <button
                            className={styles.editBtn}
                            onClick={() => {onEnableEditMode(taskData.id); setEditableValue(taskData.title)}}>
                            <img className={styles.editIcon} src={editIcon} alt="editIcon" />
                        </button>
                        <button
                            className={styles.delBtn}
                            onClick={() => onSelectDelete(taskData.id)}>
                            <img className={styles.deleteIcon} src={trashIcon} alt="trashIcon"/>
                        </button>
                    </li>
                </div>
            )
    )
}