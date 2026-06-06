import editIcon from '../assets/edit.png'
import trashIcon from '../assets/trash-bin.png'
import {fetchTaskIsDone} from "../api/http.js";
import {useEffect, useRef, useState} from "react";
// import './Task.css'


export default function EditTask({ editTodo, task}) {

    const [ isEditMode, setIsEditMode ] = useState(false);
    const inputRef = useRef(null);
    function turnOnEditMode() {
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


    const editTodo = id => {
        setTodos(tasks.map(todo => todo.id === id ? {...todo,
            idEditing: !todo.isEditing} : todo))
    }

    const handleSubmit() {
        // тут будет async await
    }

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
                                placeholder="update task"
                                ref={inputRef}
                                type="text"
                                autoFocus
                                value={taskData.title}
                                readOnly={!isEditMode}
                                onClick={turnOnEditMode}
                                onBlur={() => setIsEditMode(false)}
                            />
                            <button onClick={() => editTodo(taskData.id)}>
                                <p>Update task</p>

                            </button>
                            <button onClick={() => onSelectDelete()}>
                                <img className="actionIcon" src={trashIcon} />
                            </button>



                        </li>
                    ))}
                </section>
            )}
        </section>
    )
}