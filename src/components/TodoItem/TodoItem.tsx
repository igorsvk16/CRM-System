import React, { useState, Dispatch, SetStateAction } from "react";
import { changeTodo, deleteTodo } from "../../api/http.js";
import checkTitleValidation from "../../utils/helpers/checkTitleValidation.js";
import styles from "./TodoItem.module.css";

const TodoItem: React.FC<{ todoData: {id: number; title: string; status: string; }, updateTodos: () => void, setIsDraggingId: Dispatch<SetStateAction<number>>, isDraggingId: number, currentTitle: string, setCurrentTitle: Dispatch<SetStateAction<string>> }> = (props) => {
    const [ isEdit, setIsEdit ] = useState<boolean>(false);
    const [ editedTodoTitle, setEditedTodoTitle ] = useState<string>("");

    const onSelectDelete = () => {
        deleteTodo(props.todoData.id)
            .then(() => {
            props.updateTodos();
        }, reason => {
            alert("Не получилось удалить задачу");
            alert(reason);
        })
    }

    const onEnableEditMode = () => {
        setIsEdit(true);
        setEditedTodoTitle(props.todoData.title);
        props.updateTodos();
    }

    const cancelEditTask = () => {
        setIsEdit(false);
        props.updateTodos();
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
                    props.updateTodos();
                    setEditedTodoTitle('');
                }, reason => {
                    alert("Не получилось отредактировать задачу");
                    alert(reason);
                })
        }
    }

    const handleDragging = (id: number, title: string) => {
        props.setIsDraggingId(id);
        props.setCurrentTitle(title);
    }

return isEdit ?
    <div className={styles.todoContainer}>
        <div
            className={styles.todo}
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
                {/*<SaveButton />*/}
                <div className={styles.taskEditButtons}>
                    <button className={styles.editBtn} type="submit">Сохранить</button>
                    <button className={styles.delBtn} onClick={cancelEditTask}>Отмена</button>
                </div>
            </form>
            {/*<CancelButton onSelectCancel={cancelEditTask} />*/}
        </div>
    </div>

    :

    <div className={styles.todoContainer}>
        <div
            className={styles.todo}
             key={props.todoData.id}
             draggable
             onDragStart={() => handleDragging(props.todoData.id, props.todoData.title)}
        >
            <div>
                <p>{props.todoData.title}</p>
            </div>
            <div className={styles.taskButtons}>
                {/*<EditButton onEdit={onEnableEditMode} />*/}
                <button onClick={onEnableEditMode} className={styles.editBtn}>Открыть</button>
                {/*<DeleteButton onDelete={onSelectDelete} />*/}
                <button onClick={onSelectDelete} className={styles.delBtn}>Удалить</button>
            </div>
        </div>
    </div>
}

export default TodoItem;