export default function Task({ tasks, isLoading, loadingText, fallbackText }) {
    return (
        <section className="tasks-category">
            {isLoading && <p className="fallback-text">{loadingText}</p>}
            {!isLoading && tasks.length === 0 && <p className="fallback-text">{fallbackText}</p>}
            {!isLoading && tasks.length > 0 && (
                <ul className="tasks">
                    {tasks.map((task) => (
                        <li key={task.id} className="task">
                            <button onClick={() => onSelectStatus()} />
                            <p>{task.title}</p>
                            <button onClick={() => onSelectEdit()}></button>
                            <button>
                                <img />
                            </button>
                            <button onClick={() => onSelectDelete()}>
                                <img />
                            </button>
                        </li>



                    ))}
                </ul>
            )}
        </section>
    )
}