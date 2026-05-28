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


    useEffect(() => {
        // console.log('2')
        async function fetchTasks() {
            // console.log('3')
            setIsFetching(true);
            try {
                const tasks = await fetchUserTasks();
                setUserTasks(tasks);
                // console.log('4')
                // console.log(tasks)
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
            await fetchAddTask(taskInput, isDone);
            console.log('fetchAddTask')
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
        <Task
            tasks={userTasks}
            isLoading={isFetching}
            loadingText="Loading..."
            fallbackText='Select the task you would like to visit below'
        />
        </main>
    </>
  )
}

export default App