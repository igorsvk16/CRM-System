import React, { useState } from "react";
import {changeTodo, deleteTodo} from "../../api/http.js";
import checkTitleValidation from "../../utils/helpers/checkTitleValidation.js";
import styles from "./TodoItem.module.css";
import saveIcon from '../../assets/save.svg';
import closeIcon from '../../assets/close.svg';
import DeleteButton from "../../ui/DeleteButton/DeleteButton.tsx";
import EditButton from "../../ui/EditButton/EditButton.tsx";
import MarkButton from "../../ui/MarkButton/MarkButton.tsx";
import CancelButton from "../../ui/CancelButton/CancelButton.tsx";

const TodoItem: React.FC<{ todoData: {id: number; title: string; status: string; }, updateTodos: (text: string) => void, currentCategory: string }> = (props) => {
    const [ isEdit, setIsEdit ] = useState<boolean>(false);
    const [ editedTodoTitle, setEditedTodoTitle ] = useState<string>("");
    const onSelectDelete = () => {
        deleteTodo(props.todoData.id)
            .then(() => {
            props.updateTodos(props.currentCategory);
        }, reason => {
            alert("Не получилось удалить задачу");
            alert(reason);
        })
    }

    const onEnableEditMode = () => {
        setIsEdit(true);
        setEditedTodoTitle(props.todoData.title);
        props.updateTodos(props.currentCategory);
    }

    const cancelEditTask = () => {
        setIsEdit(false);
        props.updateTodos(props.currentCategory);
    }

    const onSelectStatus = () => {
        let newStatus = (props.todoData.status === "todo" ? "done" : "todo");
        changeTodo(props.todoData.id, newStatus, props.todoData.title)
            .then(() => {
            props.updateTodos(props.currentCategory);
        }, reason => {
            alert("Ошибка обновления статуса задачи");
            alert(reason);
            })
    }

    const onUpdateTodo = (editedTodoTitle: string, todoData: {id: number; title: string; isDone: string; }) => {
        const validateTitle = checkTitleValidation(editedTodoTitle);
        if (validateTitle) {
            alert(validateTitle);
        } else {
            changeTodo(todoData.id, todoData.isDone, editedTodoTitle)
                .then(() => {
                    todoData.title = editedTodoTitle;
                    setIsEdit(false);
                    props.updateTodos(props.currentCategory);
                    setEditedTodoTitle('');
                }, reason => {
                    alert("Не получилось отредактировать задачу");
                    alert(reason);
                })
        }
    }

return isEdit ?
    <div className={styles.todoContainer}>
        <div className={styles.todo} key={props.todoData.id}>
            <form action={() => onUpdateTodo(editedTodoTitle, props.todoData)}>
                <input
                    type="text"
                    value={editedTodoTitle}
                    readOnly={false}
                    autoFocus
                    onChange={(e) => setEditedTodoTitle(e.target.value)}
                    className={props.todoData.status === "done" ? styles.todoTitleDone : styles.todoTitleUndone}
                />
                <button
                    type="submit"
                    className={styles.editBtn}
                >
                    <img className={styles.editIcon} src={saveIcon} alt="editIcon" />
                </button>
            </form>
            <CancelButton onSelectCancel={cancelEditTask} />
            {/*<button className={styles.delBtn} onClick={() =>*/}
            {/*    cancelEditTask()*/}
            {/*}>*/}
            {/*    <img*/}
            {/*        src={closeIcon}*/}
            {/*        className={styles.deleteIcon}*/}
            {/*        alt="closeIcon"*/}
            {/*    />*/}
            {/*</button>*/}
        </div>
    </div>

    :

    <div className={styles.todoContainer}>
        <div className={styles.todo} key={props.todoData.id}>
            <MarkButton
                onSelectStatus={onSelectStatus}
                checked={props.todoData.status === "done"}
            />
            <input
                value={props.todoData.title}
                type="text"
                readOnly={true}
                className={props.todoData.status === "done" ? styles.todoTitleDone : styles.todoTitleUndone}
            />
            <EditButton onEdit={onEnableEditMode} />
            <DeleteButton onDelete={onSelectDelete} />
        </div>
    </div>
}

export default TodoItem;