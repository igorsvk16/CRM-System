import Task from "./components/Task.jsx";
import {addTask} from "./api/http.js";
import './App.css'

function App() {
    function handleAddTask() {
        const taskText = taskText.target.value;
    }
  return (
    <>
      <input id="taskText" type="text" />
      <button onClick={addTask}>Add</button>
    </>
  )
}

export default App
