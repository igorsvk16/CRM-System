import Task from "./components/Task.jsx";
import {fetchAddTask, fetchUserTasks} from "./api/http.js";
import './App.css'
import {useEffect, useState} from "react";

function App() {
    const [ userTasks, setUserTasks ] = useState([]);
    const [ error, setError ] = useState();
    const [ isFetching, setIsFetching] = useState(false);
    let taskInput = '';
    let isDone= false;

    async function handleAddTask() {
        console.log('taskText')
        try {
            await fetchAddTask(taskInput, isDone);
            console.log('taskText')
        } catch (error) {
            setError({message: error.message || "Failed"});
        }
    }

    useEffect(() => {
        async function fetchTasks() {
            setIsFetching(true);
            try {
                const tasks = await fetchUserTasks();
                setUserTasks(tasks);
            } catch (error) {
                setError({message: error.message} || "Failed fetch tasks")
            }
            setIsFetching(false);
        }
        fetchTasks();
    }, []);


  return (
    <>
        <main>
            {error && <Error title="An error " message={error.message} /> }
          <input
              onChange={e => {taskInput = e.target.value}}
              type="text"
              placeholder="Task To Be Done..." />
          <button onClick={handleAddTask}>Add</button>
        <Task></Task>
        </main>
    </>
  )
}

export default App