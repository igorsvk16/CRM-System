import editIcon from '../assets/edit.png';
import trashIcon from '../assets/trash-bin.png';
import saveIcon from '../assets/icons8-save-50.png';
// import closeIcon from '../src/assets/close.png';
import {fetchTaskIsDone, fetchUserTasks, saveEditedTask, deleteTaskById} from "../api/http.js";
import { useEffect, useRef, useState } from "react";

export default function Task({ tasks, isLoading, loadingText, onHandleDisableEditMode, onEnableEditMode, onSelectStatus, onSelectDelete, taskInput, editTaskIs}) {

    const inputRef = useRef(null);

    return (
        <section className="tasks-category">
            {isLoading && <p className="fallback-text">{loadingText}</p>}
            {!isLoading && tasks.length === 0 && <p className="fallback-text">Add your first task</p>}
            {!isLoading && tasks.length > 0 && (
                <section className="tasks">
                    {(tasks).map((taskData) => (
                        (+editTaskIs === taskData.id) ?
                            (
                                <li key={taskData.id} className="task">
                                    <input
                                        type={"checkbox"} onClick={() => onSelectStatus(taskData)}
                                    />
                                    <input
                                        onChange={e => {taskInput = e.target.value}}
                                        defaultValue={taskData.title}
                                        ref={inputRef}
                                        type="text"
                                        autoFocus
                                        readOnly={false}
                                    />
                                    <button
                                        onClick={(e) => onHandleDisableEditMode(taskData.id, taskData.isDone, taskInput)}
                                    >
                                        <img className="actionIcon" src={saveIcon} />
                                    </button>
                                    {/*<button*/}
                                    {/*    // СДЕЛАТЬ КРЕСТИК ВЫКЛЮЧЕНИЕ ЕДИТ*/}
                                    {/*    onClick={() => onSelectClose()}>*/}
                                    {/*    <img className="actionIcon" src={closeIcon} alt="closeIcon" />*/}
                                    {/*</button>*/}
                                </li>
                            ) : (
                            <li key={taskData.id} className="task">
                                <input
                                    type={"checkbox"} onClick={() => onSelectStatus(taskData)}
                                />
                                <input
                                    defaultValue={taskData.title}
                                    ref={inputRef}
                                    type="text"
                                    autoFocus
                                    readOnly={true}
                                />
                                <button
                                    onClick={() => onEnableEditMode(taskData.id)}>
                                    <img className="actionIcon" src={editIcon} />
                                </button>
                                <button
                                    onClick={() => onSelectDelete(taskData.id)}>
                                    <img className="actionIcon" src={trashIcon} alt="trashIcon"/>
                                </button>
                            </li>
                            )
                    ))}
                </section>
            )}


        </section>
    )
}