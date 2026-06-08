import Task from "./components/Task.jsx";
import {fetchAddTask, fetchTaskIsDone, fetchUserTasks, saveEditedTask} from "./api/http.js";
import './App.css'
import {useEffect, useState} from "react";
import {getNumberOfTasks} from "./api/http.js";

function App() {
    const [ userTasks, setUserTasks ] = useState([]);
    const [ filter, setFilter ] = useState("all");
    const [ error, setError ] = useState();
    const [ isFetching, setIsFetching] = useState(false);
    const [ numberOfAllTasks,  setNumberOfAllTasks] = useState();
    const [ numberOfInWorkTasks,  setNumberOfInWorkTasks] = useState();
    const [ numberOfCompletedTasks,  setNumberOfCompletedTasks] = useState();
    let taskInput = '';
    let isDone= false;

    export default async function disableEditMode(id, isDone, taskInput) {
        try {
            await saveEditedTask(id, isDone, taskInput);
            // await fetchUserTasks();
        } catch (error) {
            alert("failed update task")
        }
    }

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
                console.log(taskInput);
                console.log(taskInput.length);
                if (taskInput.length >= 2 && taskInput.length <= 64) {
                    await fetchAddTask(taskInput, isDone)
                    const addNewTask = await fetchUserTasks();
                    setUserTasks(addNewTask);
                    taskCounter();
                console.log('fetchAddTask');
            } else {
                alert("Task must be > 1 and < 65 symbols");
            }
        } catch (error) {
            setError({message: error.message || "Failed"});
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



  return (
    <>
        <main>
            {/*{error && <Error title="An error " message={error.message} /> }*/}
          <input
              onChange={e => {taskInput = e.target.value}}
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
        />
        </main>
    </>
  )
}

export default App