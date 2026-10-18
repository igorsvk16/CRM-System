import {useEffect, useState} from "react";
import { getTodos } from "../api/http.ts";
import TodoAdd from "../components/TodoAdd/TodoAdd.tsx";
import TodosFilter from "../components/TodosFilter/TodosFilter.tsx";
import Header from "../components/Header/Header.tsx";
import ProjectMenu from "../components/ProjectMenu/ProjectMenu.tsx";
import {AllTasksData} from "../type/interface/TasksData.ts";
import {TodoCounter} from "../type/interface/TodoCounter.ts";
import classes from "./Todo.module.css";

export default function TodosPage() {

    const [ todos, setTodos ] = useState<AllTasksData>();
    const [ isLoading, setIsLoading ] = useState(true);
    const [ isDraggingId, setIsDraggingId ] = useState<number>(0);
    const [ currentTitle, setCurrentTitle ] = useState<string>("");

    const [ todoCounter, setTodoCounter ] = useState<TodoCounter>({
        todo: 0,
        inProgress: 0,
        review: 0,
        readyForRelease: 0,
        onHold: 0,
        done: 0,
    });

    useEffect(() => {
        function fetchTodos() {
            updateTodos();
        }
        fetchTodos();
    }, []);

    function updateTodos() {
        getTodos()
            .then(todos => {
                setTodos(todos);
                setTodoCounter(todos.meta.statusCounts);
                setIsLoading(false);
            }, reason => {
                alert(`Ошибка при обновлении задач, ${reason}`);
            }
        )
    }
    return (
        <div className={classes.content}>
            <Header />
            <div className={classes.mainContent}>
                <ProjectMenu />
                <div className={classes.addTaskAndCategories}>
                    <div className={classes.todoAdd}>
                        <TodoAdd updateTodos={updateTodos}/>
                    </div>
                    <div className={classes.tasksDashboard}>
                        <div className={classes.todoFilter}>
                            <TodosFilter
                                todoCounter={todoCounter}
                                updateTodos={updateTodos}
                                todos={todos}
                                isLoading={isLoading}
                                isDraggingId={isDraggingId}
                                setIsDraggingId={setIsDraggingId}
                                currentTitle={currentTitle}
                                setCurrentTitle={setCurrentTitle}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


