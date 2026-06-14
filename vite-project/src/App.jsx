import Task from "./components/Task.jsx";
import {fetchAddTask, fetchTaskIsDone, fetchUserTasks, saveEditedTask, deleteTaskById } from "./api/http.js";
import './App.css'
import {useEffect, useState, useRef } from "react";
import {getNumberOfTasks} from "./api/http.js";
// import editIcon from "../assets/edit.png";
// import trashIcon from '../assets/trash-bin.png'
// import saveIcon from '../assets/icons8-save-50.png'
// import closeIcon from '../src/assets/close.png'

// import {EditTodoForm} from "./components/EditTask.jsx";

function App() {
    const [ userTasks, setUserTasks ] = useState([]);
    const [ filter, setFilter ] = useState("all");
    const [ error, setError ] = useState();
    const [ isFetching, setIsFetching] = useState(false);
    const [ numberOfAllTasks,  setNumberOfAllTasks] = useState();
    const [ numberOfInWorkTasks,  setNumberOfInWorkTasks] = useState();
    const [ numberOfCompletedTasks,  setNumberOfCompletedTasks] = useState();
    const [ editTaskIs, setEditTaskIs ] = useState();
    const [ taskInput, setTaskInput ] = useState('')
    const [ isChecked, setIsChecked ] = useState();
    let isDone= false;



    useEffect(() => {
        console.log("useEffect");
        async function fetchTasks() {
            setIsFetching(true);
            try {
                const tasks = await fetchUserTasks();
                setUserTasks(tasks);
                taskCounter();
            } catch (error) {
                setError({message: error.message} || "Failed fetch tasks")
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
                    const addNewTask = await fetchUserTasks();
                    setUserTasks(addNewTask);
                    taskCounter();
                    setTaskInput('');
                    console.log('taskInput clear');
                console.log('fetchAddTask');
            } else {
                alert("Task must be > 1 and < 65 symbols");
            }
        } catch (error) {
            setError({message: error.message || "Failed"});
            alert("Failed");
        }
    }

    async function handleChangeCategory(categoryName) {
        console.log("handleChangeCategory")
        try {
            const tasks = await fetchUserTasks(categoryName);
            setUserTasks(tasks);
            taskCounter();
        } catch (error) {
            setError({message: error.message || "Failed"});
        }

    }
    async function taskCounter() {
        try {
            const numberOfTasks = await getNumberOfTasks();
            setNumberOfAllTasks(numberOfTasks.all)
            setNumberOfInWorkTasks(numberOfTasks.inWork)
            setNumberOfCompletedTasks(numberOfTasks.completed)
        } catch (error) {
            setError({message: error.message || "Failed to load number of tasks"});
        }
    }

    async function disableEditMode(id, isDone, taskInput) {
        try {
            await saveEditedTask(id, isDone, taskInput);
            await fetchUserTasks();
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
            const tasks = await fetchUserTasks();
            setUserTasks(tasks);
            taskCounter();
        } catch (error) {
            setError({message: error.message} || "Failed fetch tasks")
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
            const tasks = await fetchUserTasks();
            console.log("fetchUserTasks+")
            setUserTasks(tasks);
            taskCounter();
        } catch (error) {
            setError({message: error.message || "Failed to delete task"});
            alert("cant delete task 2");
        }
    }
    function ifChecked(taskIsDone) {
        // if (!taskIsDone) {
        //     setIsChecked(false);
        // } else {
        //     setIsChecked(true);
        // }
        // return isChecked;
    }

    async function onSelectDelete(id) {
        try {
            await deleteTaskById(id);
            console.log("deleteTaskById+")
        } catch (error) {
            setError({message: error.message || "Failed to delete task"});
            // alert("cant delete task");
        }
        try {
            const tasks = await fetchUserTasks();
            console.log("fetchUserTasks+")
            setUserTasks(tasks);
            // taskCounter();
        } catch (error) {
            setError({message: error.message || "Failed to delete task"});
            alert("cant delete task 2");
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
            filter={filter}
            isLoading={isFetching}
            loadingText="Loading..."
            onHandleDisableEditMode={disableEditMode}
            onEnableEditMode={enableEditMode}
            onSelectStatus={onSelectStatus}
            onSelectDelete={onSelectDelete}
            taskInput={taskInput}
            editTaskIs={editTaskIs}
            onSelectEditModeCloseNoSave={onSelectEditModeCloseNoSave}
            ifChecked={ifChecked}
        />
        </main>
    </>
  )
}

export default App