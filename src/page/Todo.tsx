import {useEffect, useState} from "react";
import { getTodos } from "../api/http.ts";
import TodoAdd from "../components/TodoAdd/TodoAdd.tsx";
import TodosFilter from "../components/TodosFilter/TodosFilter.tsx";
import {TasksData} from "../type/interface/TasksData.ts";
import Header from "../components/Header/Header.tsx";
import ProjectMenu from "../components/ProjectMenu/ProjectMenu.tsx";
import {TodoCounter} from "../type/interface/TodoCounter.ts";
import classes from "./Todo.module.css";

export default function Todo() {

    const [todos, setTodos] = useState<TasksData>();
    const [todoCounter, setTodoCounter] = useState<TodoCounter>();

    const [ isLoading, setIsLoading ] = useState(true);
    const [ isDraggingId, setIsDraggingId ] = useState<number>();
    const [ currentTitle, setCurrentTitle ] = useState<string>();

    useEffect(() => {
        function fetchTodos() {
            updateTodos();
        }
        fetchTodos();
    }, []);

    function updateTodos() {
        getTodos()
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
    return (
        <div className={classes.content}>
            <Header />
            <div className={classes.mainContent}>
                <ProjectMenu />
                <div className={classes.tasksDashboard}>
                    <div className={classes.todoAdd}>
                        <TodoAdd
                            updateTodos={updateTodos}
                        />
                    </div>
                    <div className={classes.todoFilter}>
                        <TodosFilter
                            todoCounter={todoCounter}
                            updateTodos={updateTodos}
                            todos={todos}
                            isLoading={isLoading}
                            isDraggingId={isDraggingId}
                            currentTitle={currentTitle}
                            setIsDraggingId={setIsDraggingId}
                            setCurrentTitle={setCurrentTitle}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}