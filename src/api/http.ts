export async function getTodos(status="all"){
    const response = await fetch(`https://easydev.club/api/v1/todos?filter=${status}`)
    const resData = await response.json();

    if (!response.ok) {
        throw new Error('Ошибка загрузки задач');
    }
    return resData;
}

export async function addTodo(title, isDone) {
    const response = await fetch("https://easydev.club/api/v1/todos", {
        method: 'POST',
        body: JSON.stringify({
            title: title,
            isDone: isDone }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    const resData = await response.json();
    if (!response.ok) {
        throw new Error('Ошибка обновления данных');
    }
    return resData.data;
}

export async function changeTodo(id, isDone, title){
    const response = await fetch(`https://easydev.club/api/v1/todos/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
            isDone: isDone,
            title: title
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    const resData = await response.json();
    if (!response.ok) {
        throw new Error('Ошибка обновления задачи');
    }
    return resData.data;
}

export async function deleteTodo(id) {
    const response = await fetch(`https://easydev.club/api/v1/todos/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    if (!response.ok) {
        throw new Error('Ошибка удаления задачи');
    }
}