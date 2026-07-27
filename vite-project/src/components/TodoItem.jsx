import styles from './Task.module.css';
import editIcon from '../assets/edit.png';
import trashIcon from '../assets/trash-bin.png';
import saveIcon from '../assets/icons8-save-50.png';
import closeIcon from '../assets/close.png'
import {deleteTaskById} from "../api/http.js";

export default function TodoItem({editTaskIs, taskData, editableValue, setEditableValue, onHandleDisableEditMode, onSelectEditModeCloseNoSave,
                                 onSelectStatus, updateTasks, currentCategory, setEditTaskIs}) {
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