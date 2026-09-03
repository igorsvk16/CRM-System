import React, { useState } from "react";
import {changeTodo, deleteTodo} from "../../api/http.js";
import checkTitleValidation from "../../utils/helpers/checkTitleValidation.js";
import styles from "./TodoItem.module.css";
import DeleteButton from "../../ui/DeleteButton/DeleteButton.tsx";
import EditButton from "../../ui/EditButton/EditButton.tsx";
import MarkButton from "../../ui/MarkButton/MarkButton.tsx";
import CancelButton from "../../ui/CancelButton/CancelButton.tsx";
import SaveButton from "../../ui/SaveButton/SaveButton.tsx";

const TodoItem: React.FC<{ todoData: {id: number; title: string; status: string; }, updateTodos: (text: string) => void, currentCategory: string }> = (props) => {
    console.log("props.todoData")
    console.log(props.todoData)
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
        console.log(props.todoData.status)
        let newStatus = ((props.todoData.status === "todo") ? "done" : "todo");
        console.log(newStatus);
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
        <div
            className={styles.todo}
            draggable={true}
        >
            <form action={() => onUpdateTodo(editedTodoTitle, {id: props.todoData.id, title: props.todoData.title, isDone: props.todoData.status})}>
                <input
                    type="text"
                    value={editedTodoTitle}
                    readOnly={false}
                    autoFocus
                    onChange={(e) => setEditedTodoTitle(e.target.value)}
                    className={props.todoData.status === "done" ? styles.todoTitleDone : styles.todoTitleUndone}
                />
                <SaveButton />
            </form>
            <CancelButton onSelectCancel={cancelEditTask} />
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