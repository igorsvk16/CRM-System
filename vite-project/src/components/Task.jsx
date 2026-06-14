import editIcon from '../assets/edit.png';
import trashIcon from '../assets/trash-bin.png';
import saveIcon from '../assets/icons8-save-50.png';
import closeIcon from '../assets/close.png'
import { useRef } from "react";
import styles from './Task.module.css';

export default function Task({ tasks, isLoading, loadingText, onHandleDisableEditMode, onEnableEditMode, onSelectStatus, onSelectDelete, taskInput, editTaskIs, onSelectEditModeCloseNoSave }) {

    const inputRef = useRef(null);


    return (
        <section className="tasks-category">
            {isLoading && <p className="fallback-text">{loadingText}</p>}
            {!isLoading && tasks.length === 0 && <p className="fallback-text">Add your first task</p>}
            {!isLoading && tasks.length > 0 && (
                <section className={styles.tasks}>
                    {(tasks).map((taskData) => (
                        (+editTaskIs === taskData.id) ?
                            (
                                <li key={taskData.id} className={styles.task}>
                                    <input
                                        onChange={e => {taskInput = e.target.value}}
                                        defaultValue={taskData.title}
                                        ref={inputRef}
                                        type="text"
                                        readOnly={false}
                                        autoFocus
                                    />
                                    <button
                                        onClick={(e) => onHandleDisableEditMode(taskData.id, taskData.isDone, taskInput)}
                                    >
                                        <img className="actionIcon" src={saveIcon} />
                                    </button>
                                    <button
                                        onClick={() => onSelectEditModeCloseNoSave()}
                                    >

                                        <img className={styles.closeIcon} src={closeIcon} />
                                    </button>
                                </li>
                            ) : (
                            <li key={taskData.id} className="task">
                                <input
                                    type={"checkbox"}
                                    onChange={() => onSelectStatus(taskData)}
                                    checked={taskData.isDone}
                                />
                                <input
                                    defaultValue={taskData.title}
                                    ref={inputRef}
                                    type="text"
                                    readOnly={true}
                                />
                                <button
                                    onClick={() => onEnableEditMode(taskData.id)}>
                                    <img className={styles.actionIcon} src={editIcon} />
                                </button>
                                <button
                                    onClick={() => onSelectDelete(taskData.id)}>
                                    <img className={styles.actionIcon} src={trashIcon} alt="trashIcon"/>
                                </button>
                            </li>
                            )
                    ))}
                </section>
            )}


        </section>
    )
}