import {useState} from "react";
import {addTodo} from "../../api/http.js";
import styles from "./TodoAdd.module.css";

export default function TodoAdd({ updateTodos, currentCategory}) {

    const MIN_LENGTH = 2;
    const MAX_LENGTH = 64;
    let isDone= false;

    const [ todoInput, setTodoInput ] = useState('');

    function checkValidation(todoInput) {
        if (todoInput.trim().length > MAX_LENGTH) {
            alert("Максимальная длина текста 64 символа");
            return false;
        } else if (todoInput.trim().length === MIN_LENGTH - 1) {
            alert("Минимальная длина текста 2 символа");
            return false;
        } else if (todoInput.trim().length === 0) {
            setTodoInput('');
            alert("Введите текст, не пробелы");
            return false;
        } else {
            return true;
        }
    }

    async function fetchAddTodo() {
        if (checkValidation(todoInput)) {
            try {
                await addTodo(todoInput, isDone);
            } catch (error) {
                alert("Ошибка при добавлении задачи");
                alert(error)
            }
            updateTodos(currentCategory);
            setTodoInput('');
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