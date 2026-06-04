import editIcon from '../assets/edit.png'
import trashIcon from '../assets/trash-bin.png'
import {fetchTaskIsDone} from "../api/http.js";
import { useEffect, useRef } from "react";
// import './Task.css'


export default function Task({ tasks, isLoading, loadingText }) {
    let editable = true;

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

    async function onSelectEdit() {

    }

    // useEffect(() => {
    //     if (true) {
    //         dialog.current.showModal();
    //     } else {
    //         dialog.current.close();
    //     }
    // }, [open]);


    return (
        <section className="tasks-category">
            {isLoading && <p className="fallback-text">{loadingText}</p>}
            {!isLoading && tasks.length === 0 && <p className="fallback-text">Add your first task</p>}
            {!isLoading && tasks.length > 0 && (
                <dialog className="tasks">
                    {(tasks).map((taskData) => (
                        <li key={taskData.id} className="task">
                            <input type={"checkbox"} onClick={() => onSelectStatus(taskData)} />
                            {!editable &&
                                <>
                                    <p>{taskData.title}</p>
                                    <button onClick={() => onSelectEdit()}></button>
                                    <button>
                                        <img className="actionIcon" src={editIcon} />
                                    </button>
                                    <button onClick={() => onSelectDelete()}>
                                     <img className="actionIcon" src={trashIcon} />
                                    </button>
                                </>
                            }
                            {editable && <input
                                placeholder={taskData.title}

                            />

                            }

                        </li>
                    ))}
                </dialog>
            )}
        </section>
    )
}