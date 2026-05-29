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
    return resData;

}

export async function fetchUserTasks(fallbackText){
    const response = await fetch('https://easydev.club/api/v1/todos?filter=all')
    const resData = await response.json();


    if (!response.ok) {
        throw new Error('Failed fetch tasks');
    }

    // console.log(resData)
    return resData.data;
}