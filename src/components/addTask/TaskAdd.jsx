import {useState} from "react";
import {addTodo} from "../../api/http.js";
import styles from "./TaskAdd.module.css";

export default function TaskAdd({ updateTodos, currentCategory}) {
    let isDone= false;

    const [ taskInput, setTaskInput ] = useState('')

    async function fetchAddTask() {
        if ((taskInput.trim().length) >= 2 && taskInput.trim().length <= 64) {
            try {
                await addTodo(taskInput, isDone);
            } catch (error) {
                alert("Ошибка при добавлении задачи");
            }
            updateTodos(currentCategory);
            setTaskInput('');
        } else {
            if (taskInput.trim().length >= 2) {
                alert("Максимальная длина текста 64 символа")
            } else if (taskInput.trim().length === 1) {
                alert("Минимальная длина текста 2 символа");
            } else {
                alert("Введите текст, не пробелы")
                setTaskInput('')
            }
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