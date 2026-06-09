// import {useState} from 'react'
//
// export async function EditTodoForm() {editTodo, task}) => {
//     const [value, setValue] = useState(task.title);
//
//     const handleSubmit = (e) => {
//         e.preventDefault();
//         editTodo(value, task.id);
//     };
//     return (
//         <form onSubmit={handleSubmit} className="TodoForm">
//             <input type="text" value={value} onChange={(e) => setValue(e.target.value)} className="todo-input" placeholder='Update task' />
//             <button type="submit" className='todo-btn'>Add Task</button>
//         </form>
//     )
// }