import { useEffect, useState} from "react";
import { getTodos } from "./api/http.js";
import TaskList from "./components/TaskList/TaskList.jsx";
import TaskAdd from "./components/addTask/TaskAdd.jsx";
import TodosFilter from "./components/TodosFilter/TodosFilter.jsx";
import './App.module.css';

function App() {
    const [ todos, setTodos ] = useState([]);
    const [ todoCounter, setTodoCounter ] = useState([]);
    const [ currentCategory, setCurrentCategory ] = useState('all');
    const [ isLoading, setIsLoading ] = useState(true);

    useEffect(() => {
        function fetchTodos() {
            updateTodos(currentCategory).then(() =>
                setIsLoading(false));

        }
        fetchTodos();
    }, []);


    async function updateTodos(currentCategory) {
        try {
            const todos = await getTodos(currentCategory);
            setTodos(todos.data);
            setTodoCounter(todos.info)
        } catch (error) {
            alert('Ошибка при обновлении задач');
            alert(error);
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
                isLoading={isLoading}
            />
        </main>
    )
}

export default App