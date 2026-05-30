import Task from "./components/Task.jsx";
import {fetchAddTask, fetchUserTasks} from "./api/http.js";
import './App.css'
import {useEffect, useState} from "react";

function App() {
    const [ userTasks, setUserTasks ] = useState([]);
    const [ filter, setFilter ] = useState("all");
    const [ error, setError ] = useState();
    const [ isFetching, setIsFetching] = useState(false);
    let taskInput = '';
    let isDone= false;


    useEffect(() => {
        // console.log('2')
        async function fetchTasks() {
            // console.log('3')
            setIsFetching(true);
            try {
                const tasks = await fetchUserTasks();
                setUserTasks(tasks);
                // console.log('4')
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
        } catch (error) {
            setError({message: error.message || "Failed"});
        }

    }



  return (
    <>
        <main>
            {/*{error && <Error title="An error " message={error.message} /> }*/}
          <input
              onChange={e => {taskInput = e.target.value}}
              type="text"
              placeholder="Task To Be Done..." />
          <button onClick={handleAddTask}>Add</button>
            <div>
                <button onClick={() => handleChangeCategory('all')}>Все</button>
            </div>
            <div>
                <button onClick={() => handleChangeCategory('inWork')}>В работе</button>
            </div>
            <div>
                <button onClick={() => handleChangeCategory('completed')}>Сделано</button>
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