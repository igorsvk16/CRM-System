import Task from "./components/Task.jsx";
import {fetchAddTask} from "./api/http.js";
import './App.css'
import {useState} from "react";

function App() {
    const [ tasks, addTask ] = useState([]);
    const [ error, setError ] = useState();
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


  return (
    <>
          <input
              onChange={e => {taskInput = e.target.value}}
              type="text"
              placeholder="Task To Be Done..." />
          <button onClick={handleAddTask}>Add</button>
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




// function TodoList() {
//     const [tasks, setTasks] = useState([
//         {
//             id: 1,
//             text: 'Doctor Appointment',
//             completed: true
//         },
//         {
//             id: 2,
//             text: 'Meeting at School',
//             completed: false
//         }
//     ]);
//
//     const [text, setText] = useState('');
//     function addTask(text) {
//         const newTask = {
//             id: Date.now(),
//             text,
//             completed: false
//         };
//         setTasks([…tasks, newTask]);
//         setText('');
//     }
//     function deleteTask(id) {
//         setTasks(tasks.filter(task => task.id !== id));
//     }
//     function toggleCompleted(id) {
//         setTasks(tasks.map(task => {
//             if (task.id === id) {
//                 return {…task, completed: !task.completed};
//             } else {
//                 return task;
//             }
//         }));
//     }
//     return (
//         <div className="todo-list">
//             {tasks.map(task => (
//                 <TodoItem
//                     key={task.id}
//                     task={task}
//                     deleteTask={deleteTask}
//                     toggleCompleted={toggleCompleted}
//                 />
//             ))}
//             <input
//                 value={text}
//                 onChange={e => setText(e.target.value)}
//             />
//             <button onClick={() => addTask(text)}>Add</button>
//         </div>
//     );
// }
