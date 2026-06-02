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
        throw new Error('Failed to update user data');
    }
    return resData.data;

}

export async function fetchUserTasks(status="all"){
    const response = await fetch(`https://easydev.club/api/v1/todos?filter=${status}`)
    const resData = await response.json();


    if (!response.ok) {
        throw new Error('Failed fetch tasks');
    }

    // console.log(resData)
    return resData.data;
}

export async function fetchTaskIsDone(id, isDone, title){
    console.log("fetchTaskIsDone")
    console.log(id)
    console.log(isDone)
    console.log(title)
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
    console.log("resData");
    if (!response.ok) {
        throw new Error('Failed to update task status');
    }

    return resData.data;

}