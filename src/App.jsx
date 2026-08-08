import { useEffect, useState} from "react";
import { getTodos } from "./api/http.js";
import TodoList from "./components/TodoList/TodoList.jsx";
import TodoAdd from "./components/TodoAdd/TodoAdd.jsx";
import TodosFilter from "./components/TodosFilter/TodosFilter.jsx";
import styles from './App.module.css';

function App() {
    const [ todos, setTodos ] = useState([]);
    const [ todoCounter, setTodoCounter ] = useState([]);
    const [ currentCategory, setCurrentCategory ] = useState('all');
    const [ isLoading, setIsLoading ] = useState(true);
    const MIN_LENGTH = 2;
    const MAX_LENGTH = 64;

    useEffect(() => {
        function fetchTodos() {
            updateTodos(currentCategory).then(() =>
                setIsLoading(false));
        }
        fetchTodos();
    }, [currentCategory]);

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

    function checkValidation(todoInput, setTodoInput) {
        if (todoInput.trim().length > MAX_LENGTH) {
            alert("Максимальная длина текста 64 символа");
            return false;
        } else if (todoInput.trim().length === MIN_LENGTH - 1) {
            alert("Минимальная длина текста 2 символа");
            return false;
        } else if (todoInput.trim().length === 0) {
            setTodoInput('');
            alert("Введите текст, не пробелы");
            return false;
        } else {
            return true;
        }
    }

    return (
        <main>
            <TodoAdd
                updateTodos={updateTodos}
                currentCategory={currentCategory}
                checkValidation={checkValidation}
            />
            <TodosFilter
                currentCategory={currentCategory}
                todoCounter={todoCounter}
                setCurrentCategory={setCurrentCategory}
                updateTodos={updateTodos}
            />
            <TodoList
                todos={todos}
                updateTodos={updateTodos}
                currentCategory={currentCategory}
                isLoading={isLoading}
                checkValidation={checkValidation}
            />
        </main>
    )
}

export default App