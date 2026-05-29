import editIcon from '../assets/edit.png'
import trashIcon from '../assets/trash-bin.png'

export default function Task({ tasks, isLoading, loadingText }) {
    return (
        <section className="tasks-category">
            {isLoading && <p className="fallback-text">{loadingText}</p>}
            {!isLoading && tasks.length === 0 && <p className="fallback-text">Add your first task</p>}
            {!isLoading && tasks.length > 0 && (
                <ul className="tasks">
                    {(tasks).map((taskData) => (
                        <li key={taskData.id} className="task">
                            <input type={"checkbox"} onClick={() => onSelectStatus()} />
                            <p>{taskData.title}</p>
                            <button onClick={() => onSelectEdit()}></button>
                            <button>
                                <img src={editIcon} />
                            </button>
                            <button onClick={() => onSelectDelete()}>
                                <img src={trashIcon} />
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </section>
    )
}