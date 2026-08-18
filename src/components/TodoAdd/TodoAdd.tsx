import React, {useState, useRef, SetStateAction} from "react";
import {addTodo} from "../../api/http.js";
import checkTitleValidation from "../../utils/helpers/checkTitleValidation.jsx";
import styles from "./TodoAdd.module.css";

const TodoAdd: React.FC<({ updateTodos: (text: string) => void, currentCategory: string })> = (props) => {
    // const todoTextInputRef = useRef<HTMLInputElement>(null);

    let isDone = false;

    const [todoInput, setTodoInput] = useState<string>("");


    const fetchAddTodo = (event: React.FormEvent) => {
        const validateTitle = checkTitleValidation(todoInput);
        if (validateTitle) {
            alert(validateTitle);
        } else {
            console.log(todoInput);
            addTodo(todoInput, isDone)
                .then(() => {
                        props.updateTodos(props.currentCategory);
                        setTodoInput('');
                    }, reason => {
                        alert("Ошибка при добавлении задачи");
                        alert(reason);
                    }
                )
        }
    }
    return (
        <form onSubmit={fetchAddTodo} className={styles.todoAdd}>
            <input
                type="text"
                id="text"
                value={todoInput}
                onChange={(e: { target: { value: SetStateAction<string>; }; }) => {
                    setTodoInput(e.target.value);
                }}
                placeholder="Новая задача..."
                className={styles.inputNewTodo}
            />
            <button
                className={styles.addButton}
            >
                Добавить
            </button>
        </form>
    );
};

export default TodoAdd;

