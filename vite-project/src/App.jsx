import Task from "./components/Task.jsx";
import {addTask} from "./api/http.js";
import './App.css'

function App() {
    function handleAddTask() {
        const taskText = taskText.target.value;
    }
  return (
    <>
        <form>
          <input id="taskText" type="text" placeholder="Task To Be Done..." name="task_title" />
          <button onClick={addTask} type="submit">Add</button>
        </form>
    </>
  )
}

export default App
