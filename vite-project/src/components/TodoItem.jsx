import styles from './Task.module.css';
import editIcon from '../assets/edit.png';
import trashIcon from '../assets/trash-bin.png';
import saveIcon from '../assets/icons8-save-50.png';
import closeIcon from '../assets/close.png'
import {deleteTaskById, fetchTaskIsDone, saveEditedTask} from "../api/http.js";
import {useState} from "react";

export default function TodoItem({taskData, updateTasks, currentCategory}) {

    const [ editTaskIs, setEditTaskIs ] = useState('');
    const [ editableValue, setEditableValue ] = useState(null);


    async function onSelectDelete(id) {
        try {
            await deleteTaskById(id);
        } catch (error) {
            alert("Не получилось удалить задачу");
        }
        updateTasks(currentCategory);
    }

    async function onEnableEditMode(task) {
        updateTasks();
        setEditTaskIs(task);
    }

    async function onSelectEditModeCloseNoSave() {
        setEditTaskIs(null);
        updateTasks();
    }

    async function onSelectStatus(isDone, id, title) {
        let newStatus = !isDone;
        try {
            await fetchTaskIsDone(id, newStatus, title);
        } catch (error) {
            alert("Ошибка обновления статуса задачи");
        }
        updateTasks(currentCategory);
    }

    async function onHandleDisableEditMode(id, isDone, taskInput, taskData) {
        if (taskInput.length >= 2 && taskInput.length <= 64) {
            try {
                await saveEditedTask(id, isDone, taskInput);
            } catch (error) {
                alert("Не получилось отредактировать задачу")
            }
            taskData.title = taskInput;
            setEditTaskIs(null);
            updateTasks(currentCategory);
        } else {
            if (taskInput.length > 64) {
                alert("Максимальная длина текста 64 символа")
            } else {
                alert("Минимальная длина текста 2 символа")
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
                            <img className={styles.editIcon} src={saveIcon} />
                        </button>
                        <button className={styles.delBtn} onClick={() =>
                            onSelectEditModeCloseNoSave()
                        }>
                            <img
                                src={closeIcon}
                                className={styles.deleteIcon}
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
                            <img className={styles.editIcon} src={editIcon} />
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