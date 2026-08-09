import { useState } from "react";
import {changeTodo, deleteTodo} from "../../api/http.js";
import styles from './TodoItem.module.css';
import editIcon from '../../assets/edit.svg';
import saveIcon from '../../assets/save.svg';
import closeIcon from '../../assets/close.svg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

export default function TodoItem({todoData, updateTodos, currentCategory, checkValidation}) {

    const [ isEdit, setIsEdit ] = useState(false);
    const [ editedTodoTitle, setEditedTodoTitle ] = useState("");

    async function onSelectDelete() {
        try {
            await deleteTodo(todoData.id);
        } catch (error) {
            alert("Не получилось удалить задачу");
            alert(error);
        }
        updateTodos(currentCategory);
    }

    async function onEnableEditMode() {
        setIsEdit(true);
        setEditedTodoTitle(todoData.title);
        updateTodos(currentCategory);
    }

    async function cancelEditTask() {
        setIsEdit(false);
        updateTodos(currentCategory);
    }

    async function onSelectStatus() {
        let newStatus = !todoData.isDone;
        try {
            await changeTodo(todoData.id, newStatus, todoData.title);
        } catch (error) {
            alert("Ошибка обновления статуса задачи");
            alert(error);
        }
        updateTodos(currentCategory);
    }

    async function onUpdateTodo(editedTodoTitle, todoData) {
        if (checkValidation(editedTodoTitle, setEditedTodoTitle)) {
            try {
                await changeTodo(todoData.id, todoData.isDone, editedTodoTitle);
            } catch (error) {
                alert("Не получилось отредактировать задачу");
                alert(error);
            }
            todoData.title = editedTodoTitle;
            setIsEdit(false);
            updateTodos(currentCategory);
        }
    }

return isEdit ?

    <div className={styles.todoContainer}>
        <div className={styles.todo} key={todoData.id}>
            <input
                type="text"
                value={editedTodoTitle}
                readOnly={false}
                autoFocus
                onChange={(e) => setEditedTodoTitle(e.target.value)}
                className={todoData.isDone? styles.todoTitleDone : styles.todoTitleUndone}
            />
            <button
                className={styles.editBtn}
                onClick={() => onUpdateTodo(editedTodoTitle, todoData)}
            >
                <img className={styles.editIcon} src={saveIcon} alt="editIcon" />
            </button>
            <button className={styles.delBtn} onClick={() =>
                cancelEditTask()
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

    <div className={styles.todoContainer}>
        <div className={styles.todo} key={todoData.id}>
            <input
                type="checkbox"
                onChange={() => onSelectStatus()}
                checked={todoData.isDone}
                className={styles.checkboxStatusTodo}
            />
            <input
                value={todoData.title}
                type="text"
                readOnly={true}
                className={todoData.isDone? styles.todoTitleDone : styles.todoTitleUndone}
            />
            <button
                className={styles.editBtn}
                onClick={() => onEnableEditMode()}>
                <img className={styles.editIcon} src={editIcon} alt="editIcon" />
            </button>
            <button
                className={styles.delBtn}
                onClick={() => onSelectDelete()}>
                <FontAwesomeIcon icon={faTrash} />
            </button>
        </div>
    </div>
}