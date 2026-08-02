import { useEffect, useState} from "react";
import { getTodos } from "./api/http.js";
import TaskList from "./components/TaskList.jsx";
import TaskAdd from "./components/TaskAdd.jsx";
import TodosFilter from "./components/TodosFilter.jsx";
import './App.module.css';

function App() {
    const [ todos, setTodos ] = useState([]);
    const [ todoCounter, setTodoCounter ] = useState([]);
    const [ currentCategory, setCurrentCategory ] = useState('all');

    useEffect(() => {
        async function fetchTodos() {
            updateTodos(currentCategory);
        }
        fetchTodos();
    }, []);

    async function updateTodos(currentCategory) {
        try {
            const todos = await getTodos(currentCategory);
            setTodos(todos.data);
            setTodoCounter(todos.info);
        } catch (error) {
            alert('Ошибка при обновлении задач');
        }
    }

    return (
        <main>
            <TaskAdd
                updateTodos={updateTodos}
                currentCategory={currentCategory}
            />
            <TodosFilter
                currentCategory={currentCategory}
                todoCounter={todoCounter}
                setCurrentCategory={setCurrentCategory}
                updateTodos={updateTodos}
            />
            <TaskList
                tasks={todos}
                updateTodos={updateTodos}
                currentCategory={currentCategory}
            />
        </main>
    )
}

export default App