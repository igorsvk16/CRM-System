import {useState} from "react";
import {fetchAddTask} from "../api/http.js";
import styles from "../App.module.css";

export default function TaskAdd({ updateTasks, currentCategory}) {
    let isDone= false;

    const [ taskInput, setTaskInput ] = useState('')

    async function handleAddTask() {
        if ((taskInput.trim().length) >= 2 && taskInput.trim().length <= 64) {
            try {
                await fetchAddTask(taskInput, isDone);
            } catch (error) {
                alert("Ошибка при добавлении задачи");
            }
            updateTasks(currentCategory);
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
            onClick={handleAddTask}
            className={styles.addButton}
        >
            <p>Add</p>
        </button>
    </div>
    )
}