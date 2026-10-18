/* global RequestInit */

import {AllTasksData, TaskData} from "../type/interface/TasksData.ts";

const DOMAIN = import.meta.env.VITE_API_URL;

export async function getTodos() : Promise<AllTasksData> {
    const response = await fetch(DOMAIN)
    const resData = await response.json();
    if (!response.ok) {
        throw new Error('Ошибка загрузки задач');
    }
    return resData;
}

export async function addTodo(title: string) : Promise<TaskData>{
    const response = await fetch(DOMAIN, {
        method: 'POST',
        body: JSON.stringify({
            title: title,
            executorId: 1,
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

export async function changeTodo(id: number, isDone: string, title: string ) : Promise<TaskData> {
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

export async function deleteTodo(id: number) : Promise<void> {
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