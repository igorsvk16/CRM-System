import {useState} from "react";
import {addTodo} from "../../api/http.js";
import styles from "./TaskAdd.module.css";

export default function TaskAdd({ updateTodos, currentCategory}) {

    const MIN_LENGTH = 2;
    const MAX_LENGTH = 64;
    let isDone= false;

    const [ taskInput, setTaskInput ] = useState('');

    function checkValidation(taskInput) {
        if (taskInput.trim().length > MAX_LENGTH) {
            alert("Максимальная длина текста 64 символа");
            return false;
        } else if (taskInput.trim().length === MIN_LENGTH - 1) {
            alert("Минимальная длина текста 2 символа");
            return false;
        } else if (taskInput.trim().length === 0) {
            setTaskInput('');
            alert("Введите текст, не пробелы");
            return false;
        } else {
            return true;
        }
    }

    async function fetchAddTask() {
        if (checkValidation(taskInput)) {
            try {
                await addTodo(taskInput, isDone);
            } catch (error) {
                alert("Ошибка при добавлении задачи");
            }
            updateTodos(currentCategory);
            setTaskInput('');
        }
    }
    return (
    <div className={styles.taskAdd}>
        <input
            className={styles.inputNewTask}
            value={taskInput}
            onChange={e => {setTaskInput(e.target.value)}}
            type="text"
            placeholder="TaskList To Be Done..."
        />
        <button
            onClick={fetchAddTask}
            className={styles.addButton}
        >
            <p>Add</p>
        </button>
    </div>
    )
}