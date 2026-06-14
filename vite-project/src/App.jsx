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
        console.log("useEffect");
        async function fetchTasks() {
            setIsFetching(true);
            try {
                const tasks = await fetchUserTasks(currentCategory);
                setUserTasks(tasks);
                taskCounter();
            } catch (error) {
                alert("Failed fetch tasks")
            }
            setIsFetching(false);
        }
        fetchTasks();
    }, []);


    async function handleAddTask() {
        console.log('handleAddTask')
        try {
                if (taskInput.length >= 2 && taskInput.length <= 64) {
                    await fetchAddTask(taskInput, isDone);
                    const addNewTask = await fetchUserTasks(currentCategory);
                    setUserTasks(addNewTask);
                    taskCounter();
                    setTaskInput('');
                    console.log('taskInput clear');
                console.log('fetchAddTask');
            } else {
                alert("Task must be > 1 and < 65 symbols");
            }
        } catch (error) {
            alert("Failed");
        }
    }

    async function handleChangeCategory(categoryName) {
        console.log("handleChangeCategory")
        console.log("categoryName")
        console.log(categoryName)
        setCurrentCategory(categoryName)
        try {
            const tasks = await fetchUserTasks(categoryName);
            setUserTasks(tasks);
            taskCounter();
        } catch (error) {
            alert("Failed");
        }

    }
    async function taskCounter() {
        try {
            const numberOfTasks = await getNumberOfTasks();
            setNumberOfAllTasks(numberOfTasks.all)
            setNumberOfInWorkTasks(numberOfTasks.inWork)
            setNumberOfCompletedTasks(numberOfTasks.completed)
        } catch (error) {
            alert("Failed to load number of tasks");
        }
    }

    async function disableEditMode(id, isDone, taskInput) {
        try {
            console.log('--saveEditedTask--')
            await saveEditedTask(id, isDone, taskInput);
            const tasks = await fetchUserTasks(currentCategory);
            setUserTasks(tasks);
        } catch (error) {
            alert("failed update task")
        }
        setEditTaskIs('');
    }

    async function enableEditMode(task) {
        console.log("enableEditMode")
        setEditTaskIs(task);

        setIsFetching(true);
        try {
            const tasks = await fetchUserTasks(currentCategory);
            setUserTasks(tasks);
            taskCounter();
        } catch (error) {
            alert("Failed fetch tasks")
        }
        setIsFetching(false);
    }
    function onSelectEditModeCloseNoSave() {
        setEditTaskIs('');
    }

    async function onSelectStatus(taskData) {
        let newStatus = taskData.isDone;
        newStatus = !newStatus;
        const taskId = +taskData.id;
        const taskTitle = taskData.title;
        try {
            await fetchTaskIsDone(taskId, newStatus, taskTitle)

        } catch (error) {
            alert("Failed");
        }
        try {
            const tasks = await fetchUserTasks(currentCategory);
            console.log("fetchUserTasks+")
            setUserTasks(tasks);
            taskCounter();
        } catch (error) {
            alert("Failed to delete task");
            alert("cant delete task 2");
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
          <input
              value={taskInput}
              onChange={e => {setTaskInput(e.target.value)}}
              type="text"
              placeholder="Task To Be Done..."
          />
          <button onClick={handleAddTask}>Add</button>
            <div>
                <button onClick={() => handleChangeCategory('all')}>
                    <p>Все</p>
                    <p>{numberOfAllTasks}</p>
                </button>
            </div>
            <div>
                <button onClick={() => handleChangeCategory('inWork')}>
                    <p>В работе</p>
                    <p>{numberOfInWorkTasks}</p>
                </button>
            </div>
            <div>
                <button onClick={() => handleChangeCategory('completed')}>
                   <p>Сделано</p>
                    <p>{numberOfCompletedTasks}</p>
                </button>
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