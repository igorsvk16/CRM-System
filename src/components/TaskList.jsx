import TodoItem from "./TodoItem/TodoItem.jsx";

export default function TaskList({ tasks, updateTodos, currentCategory, isLoading }) {
    return (
            <section className="tasks-category">
                {isLoading && <p className="fallback-text">Загрузка задач...</p>}
                {!isLoading && tasks.length === 0 && <p className="fallback-text">Добавьте свою первую задачу</p>}
                {!isLoading && tasks.length > 0 && (
                    <section>
                        {(tasks).map((taskData) => (
                            <TodoItem
                                taskData={taskData}
                                key={taskData.id}
                                updateTodos={updateTodos}
                                currentCategory={currentCategory}
                            />
                        ))}
                    </section>
                )}
            </section>
    )

}