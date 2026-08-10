import {useState} from "react";
import {addTodo} from "../../api/http.js";
import checkTitleValidation from "../../utils/helpers/checkTitleValidation.jsx";
import styles from "./TodoAdd.module.css";

export default function TodoAdd({ updateTodos, currentCategory}) {

    let isDone= false;

    const [ todoInput, setTodoInput ] = useState("");

    function fetchAddTodo() {
        const validateTitle = checkTitleValidation(todoInput);
        if (validateTitle) {
            alert(validateTitle);
        } else {
            addTodo(todoInput, isDone)
                .then(() => {
                    updateTodos(currentCategory);
                    setTodoInput('');
                }, reason => {
                    alert("Ошибка при добавлении задачи");
                    alert(reason);
                }
            )
        }
    }

    return (
        <form className={styles.todoAdd} action={fetchAddTodo}>
            <input
                className={styles.inputNewTodo}
                value={todoInput}
                onChange={e => {
                    setTodoInput(e.target.value);
                }}
                type="text"
                placeholder="Новая задача..."
            />
            <button
                type="submit"
                className={styles.addButton}
            >
                Добавить
            </button>
        </form>
    )
}