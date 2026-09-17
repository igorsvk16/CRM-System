import {useEffect, useRef, useState} from "react";
import { getTodos } from "../api/http.ts";
import TodoAdd from "../components/TodoAdd/TodoAdd.tsx";
import TodosFilter from "../components/TodosFilter/TodosFilter.tsx";
import {TaskData} from "../type/interface/TasksData.ts";
import Header from "../components/Header/Header.tsx";
import ProjectMenu from "../components/ProjectMenu/ProjectMenu.tsx";
import {TodoCounter} from "../type/interface/TodoCounter.ts";
import classes from "./Todo.module.css";

export default function Todo() {

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
    const [todoCounter, setTodoCounter] = useState<TodoCounter>({
        todo: 0,
        inProgress: 0,
        review: 0,
        readyForRelease: 0,
        onHold: 0,
        done: 0,
    });
    const [ currentCategory, setCurrentCategory ] = useState<string>("todo");
    const [ isLoading, setIsLoading ] = useState(true);
    const [ isDraggingId, setIsDraggingId ] = useState<number>();
    const [ currentTitle, setCurrentTitle ] = useState<string>();
    const a = useRef(isDraggingId);

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
    return (
        <div className={classes.content}>
            <Header />
            <div className={classes.mainContent}>
                <ProjectMenu />
                <div className={classes.tasksDashboard}>
                    <div className={classes.todoAdd}>
                        <TodoAdd
                            updateTodos={updateTodos}
                            currentCategory={currentCategory}
                        />
                    </div>
                    <TodosFilter
                        currentCategory={currentCategory}
                        todoCounter={todoCounter}
                        setCurrentCategory={setCurrentCategory}
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
    )
}