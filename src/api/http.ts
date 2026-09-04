export async function getTodos(){
    const response = await fetch(`https://tech-mindset.ru/api/v1/tasks/`)
    const resData = await response.json();
    if (!response.ok) {
        throw new Error('Ошибка загрузки задач');
    }

    return resData;
}

export async function addTodo(title: string){
    const response = await fetch("https://tech-mindset.ru/api/v1/tasks", {
        method: 'POST',
        body: JSON.stringify({
            title: title,
            executorId: 1,
            status: "todo"
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

export async function changeTodo(id: number, isDone: string, title: string) {
    const response = await fetch(`https://tech-mindset.ru/api/v1/tasks/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
            title: title,
            executorId: 1,
            status: isDone

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
    const response = await fetch(`https://tech-mindset.ru/api/v1/tasks/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    if (!response.ok) {
        throw new Error('Ошибка удаления задачи');
    }
}