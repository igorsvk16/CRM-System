import Task from "./components/Task.jsx";
import {addTask} from "./api/http.js";
import './App.css'

function App() {
    let taskTitle = '';
    function addTask() {
        let taskText = taskText.target.value;
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