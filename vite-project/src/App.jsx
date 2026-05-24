import Task from "./components/Task.jsx";
import {fetchAddTask} from "./api/http.js";
import './App.css'
import {useState} from "react";

function App() {
    const [ tasks, addTask ] = useState([]);
    const [ error, setError ] = useState();

    let taskTitle = '';
    async function handleAddTask() {
        let taskText = taskText.target.value;
        try {
            await fetchAddTask(taskText);
        } catch (error) {
            setError({message: error.message || "Failed"})
        }
    }
  return (
    <>
        <form>
          <input id="taskText" type="text" placeholder="Task To Be Done..." name="task_title" />
          <button onClick={handleAddTask} type="submit">Add</button>
        </form>
    </>
  )
}

export default App


//  <input onInput={e => taskTitle = e.target.value} id="taskText" type="text" placeholder="Task To Be Done..." name="task_title" />
// СДЕЛАТЬ ТАК МБ ПРОСТО ПЕРЕМЕННАЯ БУДЕМ МЕНЯТЬСЯ ПОСТОЯННО И КОГДА НЕ НАДО
// import { useId, useState } from 'react';
//
// function myFunctionalComponentFunction(props) {
//     const id = useId();
//     const [input, setInput] = useState(props?.value ?? '');
//     return (
//         <div>
//             <label htmlFor={id}>Please specify:</label>
//             <input id={id} value={input} onInput={e => setInput(e.target.value)}/>
//         </div>
//     );
// }