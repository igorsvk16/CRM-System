import editIcon from '../assets/edit.png'
import trashIcon from '../assets/trash-bin.png'
import saveIcon from '../assets/icons8-save-50.png'
import { fetchTaskIsDone, saveEditedTask } from "../api/http.js";
import { useEffect, useRef, useState } from "react";
// import './Task.css'

export default function Task({ tasks, isLoading, loadingText }) {

    const [ isEditMode, setIsEditMode ] = useState(false);
    const inputRef = useRef(null);
    let taskInput = '';

    function enableEditMode() {
        setIsEditMode(true);
        inputRef.current.focus();
    }
    function disableEditMode(newTitle) {
        console.log(newTitle)
        setIsEditMode(false);
        // saveEditedTask(newTitle);
    }


    async function onSelectStatus(taskData) {
        let newStatus = taskData.isDone;
        newStatus = !newStatus;
        const taskId = +taskData.id;
        const taskTitle = taskData.title;
        try {
            await fetchTaskIsDone(taskId, newStatus, taskTitle)
        } catch (error) {
            alert("Failed");
        }
    }

    return (
        <section className="tasks-category">
            {isLoading && <p className="fallback-text">{loadingText}</p>}
            {!isLoading && tasks.length === 0 && <p className="fallback-text">Add your first task</p>}
            {!isEditMode && !isLoading && tasks.length > 0 && (
                <section className="tasks">
                    {(tasks).map((taskData) => (
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
                                onClick={() => enableEditMode()}>
                                <img className="actionIcon" src={editIcon} />
                            </button>
                            <button
                                onClick={() => onSelectDelete()}>
                                <img className="actionIcon" src={trashIcon} />
                            </button>
                        </li>
                    ))}
                </section>
            )}

            {isEditMode && !isLoading && tasks.length > 0 && (
                <section className="tasks">
                    {(tasks).map((taskData) => (
                        <li key={taskData.id} className="task">
                            <input
                                type={"checkbox"} onClick={() => onSelectStatus(taskData)}
                            />
                            <input
                                defaultValue={taskData.title}
                                ref={inputRef}
                                type="text"
                                autoFocus
                                readOnly={false}
                                onBlur={() => disableEditMode()}
                            />
                            <button
                                onClick={(e) => disableEditMode(e.target.value)}>
                                <img className="actionIcon" src={saveIcon} />
                            </button>
                            <button
                                onClick={() => onSelectDelete()}>
                                <img className="actionIcon" src={trashIcon} />
                            </button>
                        </li>
                    ))}
                </section>
            )}
        </section>
    )
}