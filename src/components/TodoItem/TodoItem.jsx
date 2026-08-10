import { useState } from "react";
import {changeTodo, deleteTodo} from "../../api/http.js";
import styles from './TodoItem.module.css';
import editIcon from '../../assets/edit.svg';
import saveIcon from '../../assets/save.svg';
import closeIcon from '../../assets/close.svg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import checkTitleValidation from "../../utils/helpers/checkTitleValidation.jsx";

export default function TodoItem({todoData, updateTodos, currentCategory}) {

    const [ isEdit, setIsEdit ] = useState(false);
    const [ editedTodoTitle, setEditedTodoTitle ] = useState("");

    function onSelectDelete() {
        deleteTodo(todoData.id)
            .then(() => {
            updateTodos(currentCategory);
        }, reason => {
            alert("Не получилось удалить задачу");
            alert(reason);
        })
    }

    function onEnableEditMode() {
        setIsEdit(true);
        setEditedTodoTitle(todoData.title);
        updateTodos(currentCategory);
    }

    function cancelEditTask() {
        setIsEdit(false);
        updateTodos(currentCategory);
    }

    function onSelectStatus() {
        let newStatus = !todoData.isDone;
        changeTodo(todoData.id, newStatus, todoData.title)
            .then(() => {
            updateTodos(currentCategory);
        }, reason => {
            alert("Ошибка обновления статуса задачи");
            alert(reason);
            })
    }

    function onUpdateTodo(editedTodoTitle, todoData) {
        const validateTitle = checkTitleValidation(editedTodoTitle);
        if (validateTitle) {
            alert(validateTitle);
        } else {
            changeTodo(todoData.id, todoData.isDone, editedTodoTitle)
                .then(() => {
                    todoData.title = editedTodoTitle;
                    setIsEdit(false);
                    updateTodos(currentCategory);
                    setEditedTodoTitle('');
                }, reason => {
                    alert("Не получилось отредактировать задачу");
                    alert(reason);
                })
        }
    }

return isEdit ?
    <div className={styles.todoContainer}>
        <div className={styles.todo} key={todoData.id}>
            <form action={() => onUpdateTodo(editedTodoTitle, todoData)}>
                <input
                    type="text"
                    value={editedTodoTitle}
                    readOnly={false}
                    autoFocus
                    onChange={(e) => setEditedTodoTitle(e.target.value)}
                    className={todoData.isDone? styles.todoTitleDone : styles.todoTitleUndone}
                />
                <button
                    type="submit"
                    className={styles.editBtn}
                >
                    <img className={styles.editIcon} src={saveIcon} alt="editIcon" />
                </button>
            </form>
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