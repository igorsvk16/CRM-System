import editIcon from '../assets/edit.png'
import trashIcon from '../assets/trash-bin.png'
import saveIcon from '../assets/icons8-save-50.png'
import { fetchTaskIsDone } from "../api/http.js";
import { useEffect, useRef, useState } from "react";
import { disableEditMode } from "../App.jsx";

export default function Task({ tasks, isLoading, loadingText }) {

    const [ isEditMode, setIsEditMode ] = useState(false);
    const inputRef = useRef(null);
    let taskInput = '1';
    console.log(taskInput)

    // тут сделать смену едит мода и обращение к disableEditMode
    function handleDisableEditMode(id, isDone, taskInput) {
        setIsEditMode(false);
        disableEditMode(id, isDone, taskInput)
    }

    function changeEditMode(bool) {
        setIsEditMode(bool)
    }

    function enableEditMode() {
        console.log("enableEditMode")
        setIsEditMode(true);
        inputRef.current.focus();
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
                    <p>!isEditMode</p>
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
                    <p>isEditMode</p>
                    {(tasks).map((taskData) => (
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
                                // ОБНОВЛЯЕТСЯ ПО 10 РАЗ ПОТОМ ПОСЛЕ НАЖАТИЯ РЕДАКТИРОВАТЬ ЗАДАЧУ
                                // onBlur={() => disableEditMode()}
                            />
                            <button
                                onClick={(e) => handleDisableEditMode(taskData.id, taskData.isDone, taskInput)}
                            >
                                <img className="actionIcon" src={saveIcon} />
                            </button>
                            <button
                                // СДЕЛАТЬ КРЕСТИК ВЫКЛЮЧЕНИЕ ЕДИТ
                                onClick={() => onSelectClose()}>
                                <img className="actionIcon" src={closeIcon} />
                            </button>
                        </li>
                    ))}
                </section>
            )}
        </section>
    )
}