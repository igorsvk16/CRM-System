import TaskList from "../components/TaskList.jsx";
import { fetchUserTasks, saveEditedTask } from "../api/http.js";
import '../App.module.css'
import { useEffect, useState } from "react";
import { getNumberOfTasks } from "../api/http.js";
import TaskAdd from "../components/TaskAdd.jsx";
import TodosFilter from "../components/TodosFilter.jsx";

function TodoListPage() {
    const [ userTasks, setUserTasks ] = useState([]);
    const [ isFetching, setIsFetching] = useState(false);
    const [ numberOfAllTasks,  setNumberOfAllTasks] = useState();
    const [ numberOfInWorkTasks,  setNumberOfInWorkTasks] = useState();
    const [ numberOfCompletedTasks, setNumberOfCompletedTasks] = useState();
    const [ currentCategory, setCurrentCategory ] = useState('all');

    useEffect(() => {
        async function fetchTasks() {
            setIsFetching(true);
            updateTasks(currentCategory);
            setIsFetching(false);
        }
        fetchTasks();
    }, []);

    async function updateTasks(currentCategory) {
        try {
            const tasks = await fetchUserTasks(currentCategory);
            setUserTasks(tasks);
            taskCounter();
        } catch (error) {
            alert('Ошибка при обновлении задач');
        }
    }

    async function taskCounter() {
        try {
            const numberOfTasks = await getNumberOfTasks();
            setNumberOfAllTasks(numberOfTasks.all);
            setNumberOfInWorkTasks(numberOfTasks.inWork);
            setNumberOfCompletedTasks(numberOfTasks.completed);
        } catch (error) {
            alert("Ошибка подсчёта количества задач");
        }
    }

  return (
      <main>
          <TaskAdd
              updateTasks={updateTasks}
              currentCategory={currentCategory}
          />
          <TodosFilter
              currentCategory={currentCategory}
              numberOfAllTasks={numberOfAllTasks}
              numberOfInWorkTasks={numberOfInWorkTasks}
              numberOfCompletedTasks={numberOfCompletedTasks}
              setCurrentCategory={setCurrentCategory}
              updateTasks={updateTasks}
          />
          <TaskList
              tasks={userTasks}
              isLoading={isFetching}
              loadingText="Loading..."
              updateTasks={updateTasks}
              currentCategory={currentCategory}
          />
      </main>
  )
}

export default TodoListPage