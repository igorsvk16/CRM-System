import { useEffect, useState} from "react";
import { getTodos } from "./api/http.js";
import TaskList from "./components/TaskList.jsx";
import TaskAdd from "./components/TaskAdd.jsx";
import TodosFilter from "./components/TodosFilter.jsx";
import './App.module.css';

function App() {
    const [ todos, setTodos ] = useState([]);
    const [ isFetching, setIsFetching] = useState(false);
    const [ todoCounter, setTodoCounter ] = useState([]);
    const [ currentCategory, setCurrentCategory ] = useState('all');

    useEffect(() => {
        async function fetchTodos() {
            setIsFetching(true);
            updateTodos(currentCategory);
            setIsFetching(false);
        }
        fetchTodos();
    }, []);

    async function updateTodos(currentCategory) {
        try {
            const tasks = await getTodos(currentCategory);
            setTodos(tasks.data);
            setTodoCounter(tasks.info);
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
                isLoading={isFetching}
                updateTodos={updateTodos}
                currentCategory={currentCategory}
            />
        </main>
    )
}

export default App