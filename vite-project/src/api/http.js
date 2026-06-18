export async function fetchAddTask(title, isDone) {
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

export async function fetchUserTasks(status="all"){
    const response = await fetch(`https://easydev.club/api/v1/todos?filter=${status}`)
    const resData = await response.json();

    if (!response.ok) {
        throw new Error('Ошибка загрузки задач');
    }

    return resData.data;
}

export async function fetchTaskIsDone(id, isDone, title){
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
        throw new Error('Ошибка обновления статуса');
    }

    return resData.data;

}

export async function getNumberOfTasks() {
    const response = await fetch(`https://easydev.club/api/v1/todos`);
    const resData = await response.json();
    if (!response.ok) {
        throw new Error('Ошибка загрузки количества задач');
    }
    return resData.info;
}

export async function saveEditedTask(id, isDone, newTitle) {
    const response = await fetch(`https://easydev.club/api/v1/todos/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
            isDone: isDone,
            title: newTitle
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    const resData = await response.json();
    if (!response.ok) {
        throw new Error('Ошибка загрузки задачи');
    }
    return resData.data;
}

export async function deleteTaskById(id) {
    const response = await fetch(`https://easydev.club/api/v1/todos/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    const resData = await response.json();
    if (!response.ok) {
        throw new Error('Ошибка удаления задачи');
    }
    return resData.data;
}

