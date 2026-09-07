import { useEffect, useState} from "react";
import { getTodos } from "../api/http.ts";
import TodoList from "../components/TodoList/TodoList.tsx";
import TodoAdd from "../components/TodoAdd/TodoAdd.tsx";
import TodosFilter from "../components/TodosFilter/TodosFilter.tsx";
import {type} from "node:os";
import {TaskData} from "../type/interface/TasksData.ts";
import Header from "../components/Header/Header.tsx";
import ProjectMenu from "../components/ProjectMenu/ProjectMenu.tsx";
import classes from "./Todo.module.css";

export default function Todo() {

    type TodoCounterState = {
        todo: number;
        inProgress: number;
        review: number;
        readyForRelease: number;
        onHold: number;
        done: number;
    }

    const [todos, setTodos] = useState<TaskData>({
        createdAt: "",
        creator: {name: ""},
        description: "",
        executor: {name: ""},
        id: 0,
        status: "",
        title: "",
        updatedAt: "",
    });
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
                console.log("todos.data")
                console.log(todos.data)
                setTodoCounter(todos.meta.statusCounts);
                setIsLoading(false);
            }, reason => {
                alert('Ошибка при обновлении задач');
                alert(reason);
            }
        )
    }
    return (
        <main>
            <Header />
            <TodoAdd
                updateTodos={updateTodos}
                currentCategory={currentCategory}
            />
            <div className={classes.mainContent}>
            <ProjectMenu />
            <TodosFilter
                currentCategory={currentCategory}
                todoCounter={todoCounter}
                setCurrentCategory={setCurrentCategory}
                updateTodos={updateTodos}
                todos={todos}
                isLoading={isLoading}
            />
            </div>
        </main>
    )
}