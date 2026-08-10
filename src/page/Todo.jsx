import { useEffect, useState} from "react";
import { getTodos } from "../api/http.js";
import TodoList from "../components/TodoList/TodoList.jsx";
import TodoAdd from "../components/TodoAdd/TodoAdd.jsx";
import TodosFilter from "../components/TodosFilter/TodosFilter.jsx";
import { MIN_LENGTH, MAX_LENGTH } from "../constants.jsx";

export default function Todo() {
    const [todos, setTodos] = useState({});
    const [todoCounter, setTodoCounter] = useState({});
    const [currentCategory, setCurrentCategory] = useState('all');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        function fetchTodos() {
            updateTodos(currentCategory);
        }
        fetchTodos();
    }, [currentCategory]);

    function updateTodos(currentCategory) {
        getTodos(currentCategory)
            .then(r => {
                setTodos(r.data);
                setTodoCounter(r.info);
                setIsLoading(false);
            }, reason => {
                alert('Ошибка при обновлении задач');
                alert(reason);
            }

        )
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