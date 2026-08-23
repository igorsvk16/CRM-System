import { useEffect, useState} from "react";
import { getTodos } from "../api/http.ts";
import TodoList from "../components/TodoList/TodoList.tsx";
import TodoAdd from "../components/TodoAdd/TodoAdd.tsx";
import TodosFilter from "../components/TodosFilter/TodosFilter.tsx";

export default function Todo() {

    type TodoCounterState = {
        all: number;
        inWork: number;
        completed: number;
    }

    const [todos, setTodos] = useState({});
    const [todoCounter, setTodoCounter] = useState<TodoCounterState>({});
    const [currentCategory, setCurrentCategory] = useState<string>("all");
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        function fetchTodos() {
            updateTodos(currentCategory);
        }
        fetchTodos();
    }, [currentCategory]);

    function updateTodos(currentCategory: string) {
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