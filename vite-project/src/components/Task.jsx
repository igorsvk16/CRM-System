import editIcon from '../assets/edit.png'
import trashIcon from '../assets/trash-bin.png'

export default function Task({ tasks, isLoading, loadingText, fallbackText }) {
    // console.log("--------------")
    // console.log("tasks")
    // console.log(tasks)
    // console.log("--------------")
    // console.log("--------------")
    // console.log("tasks.data")
    // console.log(tasks.data)
    // console.log("--------------")
    // console.log("--------------")
    // console.log("tasks.data[1]")
    // // console.log(tasks.data[1])
    // console.log("--------------")
    // console.log("--------------")
    // console.log("tasks.data[1]")
    // if (tasks?.data && tasks?.data.length>1)
    //     console.log(tasks.data[1].title)
    //
    //     // console.log("tasks.data[1].id")
    //     // console.log(tasks.data[1]?.id)
    // console.log("--------------")
    // console.log("--------------")


    return (
        <section className="tasks-category">
            {isLoading && <p className="fallback-text">{loadingText}</p>}
            {!isLoading && tasks.length === 0 && <p className="fallback-text">{fallbackText}</p>}
            {!isLoading && tasks.length > 0 && (
                <ul className="tasks">
                    {(tasks).map((taskData) => (
                        <li key={taskData.id} className="task">
                            <button onClick={() => onSelectStatus()} />
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