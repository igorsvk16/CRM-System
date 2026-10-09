/* global RequestInit */

const DOMAIN = import.meta.env.VITE_API_URL;

export async function getTodos(){
    const response = await fetch(DOMAIN)
    const resData = await response.json();
    if (!response.ok) {
        throw new Error('Ошибка загрузки задач');
    }
    return resData;
}

export async function addTodo(title: string){
    const response = await fetch(DOMAIN, {
        method: 'POST',
        body: JSON.stringify({
            title: title,
            executorId: 1,
            status: "todo",
            // executorId: 1,
            // status: "todo",
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    const resData = await response.json();
    if (!response.ok) {
        throw new Error('Ошибка обновления данных');
    }
    return resData;
}

export async function changeTodo(id: number, isDone: string, title: string ) {
    const response = await fetch(`${DOMAIN}/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
            title: title,
            executorId: 1,
            status: isDone,

        }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    const resData = response.json();
    if (!response.ok) {
        throw new Error('Ошибка обновления задачи');
    }
    return resData;
}

export async function deleteTodo(id: number) {
    const response = await fetch(`${DOMAIN}/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    if (!response.ok) {
        throw new Error('Ошибка удаления задачи');
    }
}