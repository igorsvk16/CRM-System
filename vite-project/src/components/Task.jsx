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

        const editTodo = id => {
            setTodos(tasks.map(todo => todo.id === id ? {...todo,
            idEditing: !todo.isEditing} : todo))
        }

        function onTodoChange(value){
        this.setState({
            name: value
        });


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
                            ref={inputRef}
                            type="text"
                            autoFocus
                            value={taskData.title}
                            readOnly={!isEditMode}
                            onBlur={() => setIsEditMode(false)}
                            />
                            <button onClick={() => editTodo(taskData.id)}>
                                <img className="actionIcon" src={editIcon} />

                            </button>
                            <button onClick={() => onSelectDelete()}>
                                <img className="actionIcon" src={trashIcon} />
                            </button>
                            <div>
                                {/*<input*/}
                                {/*    value={taskData.title}*/}
                                {/*    onChange={(e) => setValue(e.target.value)}*/}
                                {/*/>*/}
                                {/*<input type="text" value={taskData.title} placeholder='Update task' type="text" />*/}
                                {/*<input*/}
                                {/*    id={taskData.id}*/}
                                {/*    className="form-control"*/}
                                {/*    type="text"*/}
                                {/*    value={taskData.title}*/}
                                {/*    onChange={e => onTodoChange(e.target.value)}*/}
                                {/*/>*/}
                                <input type="text" defaultValue={taskData.title} />

                            </div>



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