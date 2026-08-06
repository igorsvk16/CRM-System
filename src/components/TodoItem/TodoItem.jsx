import { useState } from "react";
import {changeTodo, deleteTodo} from "../../api/http.js";
import styles from './TodoItem.module.css';
import editIcon from '../../assets/edit.png';
import trashIcon from '../../assets/trash-bin.png';
import saveIcon from '../../assets/icons8-save-50.png';
import closeIcon from '../../assets/close.png'


export default function TodoItem({taskData, updateTodos, currentCategory}) {

    const [ currentTodoId, setCurrentTodoId ] = useState("");
    const [ editedTodoTitle, setEditedTodoTitle ] = useState(null);


    async function onSelectDelete(id) {
        try {
            await deleteTodo(id);
        } catch (error) {
            alert("Не получилось удалить задачу");
            alert(error);
        }
        updateTodos(currentCategory);
    }

    async function onEnableEditMode(task) {
        updateTodos(currentCategory)
        setCurrentTodoId(task)
    }

    async function onSelectEditModeCloseNoSave() {
        setCurrentTodoId(null);
        updateTodos(currentCategory);
    }

    async function onSelectStatus(isDone, id, title) {
        let newStatus = !isDone;
        try {
            await changeTodo(id, newStatus, title);
        } catch (error) {
            alert("Ошибка обновления статуса задачи");
            alert(error);
        }
        updateTodos(currentCategory);
    }

    async function onUpdateTodo(id, isDone, taskInput, taskData) {
        if (taskInput.trim().length >= 2 && taskInput.trim().length <= 64) {
            try {
                await changeTodo(id, isDone, taskInput);
            } catch (error) {
                alert("Не получилось отредактировать задачу");
                alert(error);
            }
            taskData.title = taskInput;
            setCurrentTodoId(null);
            updateTodos(currentCategory);
        } else {
            if (taskInput.trim().length >= 2) {
                alert("Максимальная длина текста 64 символа")
            } else if (taskInput.trim().length === 1) {
                alert("Минимальная длина текста 2 символа");
            } else {
                alert("Введите текст, не пробелы")
            }
        }
    }

    return +currentTodoId === taskData.id ?
        <div className={styles.taskContainer}>
            <div className={styles.task} key={taskData.id}>
                    <input
                        type="text"
                        value={editedTodoTitle}
                        readOnly={false}
                        autoFocus
                        onChange={(e) => setEditedTodoTitle(e.target.value)}
                        className={taskData.isDone? styles.taskTitleDone : styles.taskTitleUndone}
                    />
                    <button
                        className={styles.editBtn}
                        onClick={() =>{{
                            onUpdateTodo(taskData.id, taskData.isDone, editedTodoTitle, taskData);
                        }}
                        }
                    >
                        <img className={styles.editIcon} src={saveIcon} alt="editIcon" />
                    </button>
                    <button className={styles.delBtn} onClick={() =>
                        onSelectEditModeCloseNoSave()
                    }>
                        <img
                            src={closeIcon}
                            className={styles.deleteIcon}
                            alt="closeIcon"
                        />
                    </button>
            </div>
        </div>
        :
        <div className={styles.taskContainer}>
        <div className={styles.task} key={taskData.id}>
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
                        onClick={() => {onEnableEditMode(taskData.id); setEditedTodoTitle(taskData.title)}}>
                        <img className={styles.editIcon} src={editIcon} alt="editIcon" />
                    </button>
                    <button
                        className={styles.delBtn}
                        onClick={() => onSelectDelete(taskData.id)}>
                        <img className={styles.deleteIcon} src={trashIcon} alt="trashIcon"/>
                    </button>
            </div>
        </div>
    // <div className={styles.task} key={taskData.id}>
    //     <li key={taskData.id} className={styles.task}>
    //         <input
    //             type="text"
    //             value={editedTodoTitle}
    //             readOnly={false}
    //             autoFocus
    //             onChange={(e) => setEditedTodoTitle(e.target.value)}
    //             className={taskData.isDone? styles.taskTitleDone : styles.taskTitleUndone}
    //         />
    //         <button
    //             className={styles.editBtn}
    //             onClick={() =>{{
    //                 onUpdateTodo(taskData.id, taskData.isDone, editedTodoTitle, taskData);
    //             }}
    //             }
    //         >
    //             <img className={styles.editIcon} src={saveIcon} alt="editIcon" />
    //         </button>
    //         <button className={styles.delBtn} onClick={() =>
    //             onSelectEditModeCloseNoSave()
    //         }>
    //             <img
    //                 src={closeIcon}
    //                 className={styles.deleteIcon}
    //                 alt="closeIcon"
    //             />
    //         </button>
    //     </li>
    // </div> : <div className={styles.task} key={taskData.id}>
    //     <li key={taskData.id} className={styles.task}>
    //         <input
    //             type="checkbox"
    //             onChange={() => onSelectStatus(taskData.isDone, taskData.id, taskData.title)}
    //             checked={taskData.isDone}
    //             className={styles.checkboxStatusTask}
    //         />
    //         <input
    //             value={taskData.title}
    //             type="text"
    //             readOnly={true}
    //             className={taskData.isDone? styles.taskTitleDone : styles.taskTitleUndone}
    //         />
    //         <button
    //             className={styles.editBtn}
    //             onClick={() => {onEnableEditMode(taskData.id); setEditedTodoTitle(taskData.title)}}>
    //             <img className={styles.editIcon} src={editIcon} alt="editIcon" />
    //         </button>
    //         <button
    //             className={styles.delBtn}
    //             onClick={() => onSelectDelete(taskData.id)}>
    //             <img className={styles.deleteIcon} src={trashIcon} alt="trashIcon"/>
    //         </button>
    //     </li>
    // </div>


    // <div className={styles.task} key={taskData.id}>
    {/*<li key={taskData.id} className={styles.task}>*/}
    {/*    <form action={onUpdateTodo(taskData.id, taskData.isDone, editedTodoTitle, taskData)}>*/}
    {/*        <label>*/}
    {/*        <input*/}
    {/*            type="text"*/}
    {/*            value={editedTodoTitle}*/}
    {/*            readOnly={false}*/}
    {/*            autoFocus*/}
    {/*            onChange={(e) => setEditedTodoTitle(e.target.value)}*/}
    {/*            className={taskData.isDone? styles.taskTitleDone : styles.taskTitleUndone}*/}
    {/*        />*/}
    {/*        <button*/}
    {/*            type="submit"*/}
    {/*            className={styles.editBtn}*/}
    {/*        >*/}
    {/*            <img className={styles.editIcon} src={saveIcon} alt="editIcon" />*/}
    {/*        </button>*/}
    {/*        </label>*/}
    {/*    </form>*/}
    {/*    <button className={styles.delBtn} onClick={() =>*/}
    {/*        onSelectEditModeCloseNoSave()*/}
    {/*    }>*/}
    {/*        <img*/}
    {/*            src={closeIcon}*/}
    {/*            className={styles.deleteIcon}*/}
    {/*            alt="closeIcon"*/}
    {/*        />*/}
    {/*    </button>*/}
    {/*</li>*/}
// </div>

}