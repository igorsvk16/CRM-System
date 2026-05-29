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

    async function handleChangeCategory(categoryName) {
        const tasks = await fetchUserTasks(categoryName);
        setUserTasks(tasks);
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
                <button>Все</button>
            </div>
            <div>
                <button>В работе</button>
            </div>
            <div>
                <button>Сделано</button>
            </div>
        <Task
            tasks={userTasks}
            isLoading={isFetching}
            loadingText="Loading..."
        />
        </main>
    </>
  )
}

export default App