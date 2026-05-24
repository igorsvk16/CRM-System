export async function fetchAddTask(title, isDone) {
    const response = await fetch("https://easydev.club/api/v1/todos", {
        method: 'POST',
        body: JSON.stringify({
            title: {title},
            isDone: {isDone} }),
        headers: {
            'Content-Type': 'application/json'
        }
    }
)
}