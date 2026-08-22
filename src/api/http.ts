export async function getTodos(status="all"){
    const response = await fetch(`https://easydev.club/api/v1/todos?filter=${status}`)
    const resData = await response.json();

    if (!response.ok) {
        throw new Error('Ошибка загрузки задач');
    }
    return resData;
}

export async function addTodo(title: string, isDone: boolean){
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
    console.log(resData)
    if (!response.ok) {
        throw new Error('Ошибка обновления данных');
    }
    return resData;
}

export async function changeTodo(id: number, isDone: boolean, title: string) {
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
    const resData = response.json;
    if (!response.ok) {
        throw new Error('Ошибка обновления задачи');
    }
    return resData;
}

export async function deleteTodo(id: number) {
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