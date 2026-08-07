import { useState } from "react";
import {changeTodo, deleteTodo} from "../../api/http.js";
import styles from './TodoItem.module.css';
import editIcon from '../../assets/edit.png';
import trashIcon from '../../assets/trash-bin.png';
import saveIcon from '../../assets/icons8-save-50.png';
import closeIcon from '../../assets/close.png'

export default function TodoItem({todoData, updateTodos, currentCategory, checkValidation}) {

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

    async function onEnableEditMode(todo) {
        updateTodos(currentCategory)
        setCurrentTodoId(todo)
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

    async function onUpdateTodo(id, isDone, todoInput, todoData) {
        if (checkValidation(todoInput, setEditedTodoTitle)) {
            try {
                await changeTodo(id, isDone, todoInput);
            } catch (error) {
                alert("Не получилось отредактировать задачу");
                alert(error);
            }
            todoData.title = todoInput;
            setCurrentTodoId(null);
            updateTodos(currentCategory);
        }
    }

    return +currentTodoId === todoData.id ?
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
                        onClick={() =>{{
                            onUpdateTodo(todoData.id, todoData.isDone, editedTodoTitle, todoData);
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
        <div className={styles.todoContainer}>
        <div className={styles.todo} key={todoData.id}>
                    <input
                        type="checkbox"
                        onChange={() => onSelectStatus(todoData.isDone, todoData.id, todoData.title)}
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
                        onClick={() => {onEnableEditMode(todoData.id); setEditedTodoTitle(todoData.title)}}>
                        <img className={styles.editIcon} src={editIcon} alt="editIcon" />
                    </button>
                    <button
                        className={styles.delBtn}
                        onClick={() => onSelectDelete(todoData.id)}>
                        <img className={styles.deleteIcon} src={trashIcon} alt="trashIcon"/>
                    </button>
            </div>
        </div>
}