import { useEffect, useState} from "react";
import { getTodos } from "../api/http.js";
import TodoList from "../components/TodoList/TodoList.tsx";
import TodoAdd from "../components/TodoAdd/TodoAdd.tsx";
import TodosFilter from "../components/TodosFilter/TodosFilter.jsx";

export default function Todo() {
    const [todos, setTodos] = useState({});
    const [todoCounter, setTodoCounter] = useState({});
    const [currentCategory, setCurrentCategory] = useState("all");
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        function fetchTodos() {
            updateTodos(currentCategory);
        }
        fetchTodos();
    }, [currentCategory]);

    function updateTodos(currentCategory) {
        getTodos(currentCategory)
            .then(todos => {
                setTodos(todos.data);
                setTodoCounter(todos.info);
                setIsLoading(false);
            }, reason => {
                alert('Ошибка при обновлении задач');
                alert(reason);
            }
        )
    }

    return (
        <main>
            <TodoAdd
                updateTodos={updateTodos}
                currentCategory={currentCategory}
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
            />
        </main>
    )
}