import editIcon from '../assets/edit.png';
import trashIcon from '../assets/trash-bin.png';
import saveIcon from '../assets/icons8-save-50.png';
import closeIcon from '../assets/close.png'
import {useEffect, useRef, useState} from "react";
import styles from './Task.module.css';

export default function Task({ tasks, isLoading, loadingText, onHandleDisableEditMode, onEnableEditMode, onSelectStatus, onSelectDelete, editTaskIs, onSelectEditModeCloseNoSave }) {

    const [ editableValue, setEditableValue ] = useState("");
    const inputRef = useRef(null);

    return (
        <section className="tasks-category">
            {isLoading && <p className="fallback-text">{loadingText}</p>}
            {!isLoading && tasks.length === 0 && <p className="fallback-text">Добавьте свою первую задачу</p>}
            {!isLoading && tasks.length > 0 && (
                <section className={styles.tasks}>
                    {(tasks).map((taskData) => (
                        (+editTaskIs === taskData.id) ?
                            (<div className={styles.taskDiv} key={taskData.id}>
                                    <li key={taskData.id} className={styles.task}>
                                        <div className={styles.notCheckbox}></div>
                                            <input
                                                type="text"
                                                defaultValue={editableValue}
                                                ref={inputRef}
                                                readOnly={false}
                                                autoFocus
                                                onChange={(e) => setEditableValue(e.target.value)}
                                            />
                                            <button
                                                className={styles.editBtn}
                                                onClick={() => {onHandleDisableEditMode(taskData.id, taskData.isDone, editableValue);
                                                }
                                            }
                                                >
                                                <img className={styles.editIcon} src={saveIcon} />
                                            </button>
                                            <button
                                                className={styles.delBtn}
                                                onClick={() => onSelectEditModeCloseNoSave()}
                                            >
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
                                            defaultValue={taskData.title || ""}
                                            ref={inputRef}
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
                    ))}
                </section>
            )}
        </section>
    )
}