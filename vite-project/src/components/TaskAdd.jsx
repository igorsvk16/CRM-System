import styles from "../App.module.css";

export default function TaskAdd({ taskInput, setTaskInput, handleAddTask }) {
    return (
    <div className={styles.taskAdd}>
        <input
            className={styles.inputNewTask}
            value={taskInput}
            onChange={e => {setTaskInput(e.target.value)}}
            type="text"
            placeholder="Task To Be Done..."
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