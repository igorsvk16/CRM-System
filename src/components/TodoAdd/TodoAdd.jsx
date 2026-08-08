import {useState} from "react";
import {addTodo} from "../../api/http.js";
import styles from "./TodoAdd.module.css";

export default function TodoAdd({ updateTodos, currentCategory, checkValidation}) {

    let isDone= false;

    const [ todoInput, setTodoInput ] = useState('');

    async function fetchAddTodo() {
        if (checkValidation(todoInput, setTodoInput)) {
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