import editIcon from '../assets/edit.png'
import trashIcon from '../assets/trash-bin.png'
import {fetchTaskIsDone} from "../api/http.js";
import {useEffect, useRef, useState} from "react";
// import './Task.css'


export default function Task({ tasks, isLoading, loadingText }) {

    const [ isEditMode, setIsEditMode ] = useState(false);
    const inputRef = useRef(null);
    function turnOnEditMode() {
        setIsEditMode(true);
        inputRef.current.focus();
    }


    // let editable = true;

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
                <section className="tasks">
                    {(tasks).map((taskData) => (
                        <li key={taskData.id} className="task">
                            <input type={"checkbox"} onClick={() => onSelectStatus(taskData)} />
                            <input
                            ref={inputRef}
                            type="text"
                            autoFocus
                            value={taskData.title}
                            readOnly={!isEditMode}
                            onClick={turnOnEditMode}
                            onBlur={() => setIsEditMode(false)}
                            />
                            <button onClick={turnOnEditMode}>
                                <img className="actionIcon" src={editIcon} />

                            </button>
                            <button onClick={() => onSelectDelete()}>
                                <img className="actionIcon" src={trashIcon} />
                            </button>



                            {/*<input type={"checkbox"} onClick={() => onSelectStatus(taskData)} />*/}
                            {/*{!editable &&*/}
                            {/*    <>*/}
                            {/*        */}
                            {/*        <p>{taskData.title}</p>*/}
                            {/*        <button onClick={() => onSelectEdit()}></button>*/}
                            {/*        <button>*/}
                            {/*            <img className="actionIcon" src={editIcon} />*/}
                            {/*        </button>*/}
                            {/*        <button onClick={() => onSelectDelete()}>*/}
                            {/*         <img className="actionIcon" src={trashIcon} />*/}
                            {/*        </button>*/}
                            {/*    </>*/}
                            {/*}*/}
                            {/*{editable && <input*/}
                            {/*    placeholder={taskData.title}*/}

                            {/*/>*/}

                            {/*}*/}

                        </li>
                    ))}
                </section>
            )}
        </section>
    )
}