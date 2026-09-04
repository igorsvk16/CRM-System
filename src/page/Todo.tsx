import { useEffect, useState} from "react";
import { getTodos } from "../api/http.ts";
import TodoList from "../components/TodoList/TodoList.tsx";
import TodoAdd from "../components/TodoAdd/TodoAdd.tsx";
import TodosFilter from "../components/TodosFilter/TodosFilter.tsx";

export default function Todo() {

    type TodoCounterState = {
        todo: number;
        inProgress: number;
        review: number;
        readyForRelease: number;
        onHold: number;
        done: number;
    }

    const [todos, setTodos] = useState({});
    const [todoCounter, setTodoCounter] = useState<TodoCounterState>({
        todo: 0,
        inProgress: 0,
        review: 0,
        readyForRelease: 0,
        onHold: 0,
        done: 0,
    });
    const [currentCategory, setCurrentCategory] = useState<string>("todo");
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
                setTodoCounter(todos.meta.statusCounts);
                setIsLoading(false);
            }, reason => {
                alert('Ошибка при обновлении задач');
                alert(reason);
            }
        )
    }
    console.log("todos")
    console.log(todos)

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
                todos={todos}
                isLoading={isLoading}
            />
            <TodoList
                todos={todos}
                updateTodos={updateTodos}
                currentCategory={currentCategory}
                isLoading={isLoading}
                category="todo"
            />
            <TodoList
                todos={todos}
                updateTodos={updateTodos}
                currentCategory={currentCategory}
                isLoading={isLoading}
                category='inProgress'
            />
            <TodoList
                todos={todos}
                updateTodos={updateTodos}
                currentCategory={currentCategory}
                isLoading={isLoading}
                category="review"
            />
            <TodoList
                todos={todos}
                updateTodos={updateTodos}
                currentCategory={currentCategory}
                isLoading={isLoading}
                category="readyForRelease"
            />
            <TodoList
                todos={todos}
                updateTodos={updateTodos}
                currentCategory={currentCategory}
                isLoading={isLoading}
                category="onHold"
            />
            <TodoList
                todos={todos}
                updateTodos={updateTodos}
                currentCategory={currentCategory}
                isLoading={isLoading}
                category="done"
            />
        </main>
    )
}