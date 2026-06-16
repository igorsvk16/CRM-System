import Task from "./components/Task.jsx";
import {fetchAddTask, fetchTaskIsDone, fetchUserTasks, saveEditedTask, deleteTaskById } from "./api/http.js";
import './App.css'
import {useEffect, useState } from "react";
import {getNumberOfTasks} from "./api/http.js";

function App() {
    const [ userTasks, setUserTasks ] = useState([]);
    const [ isFetching, setIsFetching] = useState(false);
    const [ numberOfAllTasks,  setNumberOfAllTasks] = useState();
    const [ numberOfInWorkTasks,  setNumberOfInWorkTasks] = useState();
    const [ numberOfCompletedTasks,  setNumberOfCompletedTasks] = useState();
    const [ editTaskIs, setEditTaskIs ] = useState();
    const [ taskInput, setTaskInput ] = useState('')
    const [ currentCategory, setCurrentCategory ] = useState('all');
    let isDone= false;

    useEffect(() => {
        async function fetchTasks() {
            setIsFetching(true);
            try {
                const tasks = await fetchUserTasks(currentCategory);
                setUserTasks(tasks);
                taskCounter();
            } catch (error) {
                alert("Не получилось получить задачи")
            }
            setIsFetching(false);
        }
        fetchTasks();
    }, []);


    async function handleAddTask() {
        try {
                if (taskInput.length >= 2 && taskInput.length <= 64) {
                    await fetchAddTask(taskInput, isDone);
                    const addNewTask = await fetchUserTasks(currentCategory);
                    setUserTasks(addNewTask);
                    taskCounter();
                    setTaskInput('');
            } else {
                    if (taskInput.length >= 2) {
                        alert("Максимальная длина текста 64 символа")
                    } else {
                        alert("Минимальная длина текста 2 символа")
                    }
            }
        } catch (error) {
            alert("Failed");
        }
    }

    async function handleChangeCategory(categoryName) {
        setCurrentCategory(categoryName)
        try {
            const tasks = await fetchUserTasks(categoryName);
            setUserTasks(tasks);
            taskCounter();
        } catch (error) {
            alert("Не получилось сменить категорию");
        }

    }
    async function taskCounter() {
        try {
            const numberOfTasks = await getNumberOfTasks();
            setNumberOfAllTasks(numberOfTasks.all)
            setNumberOfInWorkTasks(numberOfTasks.inWork)
            setNumberOfCompletedTasks(numberOfTasks.completed)
        } catch (error) {
            alert("Не получилось посчитать количество задач");
        }
    }

    async function disableEditMode(id, isDone, taskInput) {
        if (taskInput.length >= 2 && taskInput.length <= 64) {
            try {
                await saveEditedTask(id, isDone, taskInput);
                const tasks = await fetchUserTasks(currentCategory);
                setUserTasks(tasks);
            } catch (error) {
                alert("failed update task")
            }
            setEditTaskIs("");
        } else {
            if (taskInput.length >= 2) {
                alert("Максимальная длина текста 64 символа")
            } else {
                alert("Минимальная длина текста 2 символа")
            }
        }
    }

    async function enableEditMode(task) {
        setEditTaskIs(task);
        setIsFetching(true);
        try {
            const tasks = await fetchUserTasks(currentCategory);
            setUserTasks(tasks);
            taskCounter();
        } catch (error) {
            alert("Не получилось загрузить задачи")
        }
        setIsFetching(false);
    }
    function onSelectEditModeCloseNoSave() {
        setEditTaskIs("");
        setTaskInput("");
    }

    async function onSelectStatus(taskData) {
        let newStatus = !taskData.isDone;
        const taskId = +taskData.id;
        const taskTitle = taskData.title;
        try {
            await fetchTaskIsDone(taskId, newStatus, taskTitle)
        } catch (error) {
            alert("Ошибка обновления статуса задачи");
        }
        try {
            const tasks = await fetchUserTasks(currentCategory);
            console.log("fetchUserTasks+")
            setUserTasks(tasks);
            taskCounter();
        } catch (error) {
            alert("Не получилось удалить задачу");
        }
    }

    async function onSelectDelete(id) {
        try {
            await deleteTaskById(id);
            console.log("deleteTaskById+")
        } catch (error) {
            alert("Failed to delete task");
        }
        try {
            const tasks = await fetchUserTasks(currentCategory);
            setUserTasks(tasks);
            taskCounter();
        } catch (error) {
            alert("Failed to delete task 2");
        }
    }

  return (
    <>
        <main>
            <div id="task-add">
                  <input
                      className="input-new-task"
                      value={taskInput}
                      onChange={e => {setTaskInput(e.target.value)}}
                      type="text"
                      placeholder="Task To Be Done..."
                  />
                  <button
                      onClick={handleAddTask}
                      className="add-button"
                  >
                      <p>Add</p>
                  </button>
                </div>
            <div className="tasks-categories">
                {currentCategory === 'all' ? (
                    <div className="task-category-active">
                        <button onClick={() => handleChangeCategory('all')}>
                            <p>Все ({numberOfAllTasks})</p>
                        </button>
                    </div>
                ) : (
                    <div className="task-category">
                        <button onClick={() => handleChangeCategory('all')}>
                            <p>Все ({numberOfAllTasks})</p>
                        </button>
                    </div>
                )}


                {currentCategory === 'inWork' ? (
                    <div className="task-category-active">
                        <button onClick={() => handleChangeCategory('inWork')}>
                            <p>В работе ({numberOfInWorkTasks})</p>
                        </button>
                    </div>
                ) : (
                    <div className="task-category">
                        <button onClick={() => handleChangeCategory('inWork')}>
                            <p>В работе ({numberOfInWorkTasks})</p>
                        </button>
                    </div>
                )}

                {currentCategory === 'completed' ? (
                    <div className="task-category-active">
                        <button onClick={() => handleChangeCategory('completed')}>
                            <p>Сделано ({numberOfCompletedTasks})</p>
                        </button>
                    </div>
                ) : (
                    <div className="task-category">
                        <button onClick={() => handleChangeCategory('completed')}>
                            <p>Сделано ({numberOfCompletedTasks})</p>
                        </button>
                    </div>
                )}

            </div>

        <Task
            tasks={userTasks}
            isLoading={isFetching}
            loadingText="Loading..."
            onHandleDisableEditMode={disableEditMode}
            onEnableEditMode={enableEditMode}
            onSelectStatus={onSelectStatus}
            onSelectDelete={onSelectDelete}
            taskInput={taskInput}
            editTaskIs={editTaskIs}
            onSelectEditModeCloseNoSave={onSelectEditModeCloseNoSave}
        />
        </main>
    </>
  )
}

export default App