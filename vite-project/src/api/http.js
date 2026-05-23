export async function addTask(taskText) {
    const response = await fetch("https://easydev.club/api/v1/todos", {
        method: 'POST',
        body: JSON.stringify({taskText}),
        headers: {
            'Content-Type': 'application/json'
        }
    }
)
}