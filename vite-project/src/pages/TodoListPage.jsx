import TaskList from "../components/TaskList.jsx";
import { fetchTaskIsDone, fetchUserTasks, saveEditedTask } from "../api/http.js";
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
    const [ editTaskIs, setEditTaskIs ] = useState('');
    const [ taskInput, setTaskInput ] = useState('')
    const [ currentCategory, setCurrentCategory ] = useState('all');
    let isDone= false;

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



    async function handleChangeCategory(categoryName) {
        setCurrentCategory(categoryName);
        updateTasks(categoryName);
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

    async function enableEditMode(task) {
        updateTasks();
        setEditTaskIs(task);
    }

    async function disableEditMode(id, isDone, taskInput, taskData) {
            if (taskInput.length >= 2 && taskInput.length <= 64) {
                try {
                    await saveEditedTask(id, isDone, taskInput);
                } catch (error) {
                    alert("Не получилось отредактировать задачу")
                }
                taskData.title = taskInput;
                setEditTaskIs(null);
                updateTasks(currentCategory);
            } else {
                if (taskInput.length > 64) {
                    alert("Максимальная длина текста 64 символа")
                } else {
                    alert("Минимальная длина текста 2 символа")
                }
            }
        }

    async function onSelectEditModeCloseNoSave() {
        setEditTaskIs(null);
        updateTasks();
    }

    async function onSelectStatus(isDone, id, title) {
        let newStatus = !isDone;
        try {
            await fetchTaskIsDone(id, newStatus, title);
        } catch (error) {
            alert("Ошибка обновления статуса задачи");
        }
        updateTasks(currentCategory);
    }

    // async function onSelectDelete(id) {
    //     try {
    //         await deleteTaskById(id);
    //     } catch (error) {
    //         alert("Не получилось удалить задачу");
    //     }
    //     updateTasks(currentCategory);
    // }

  return (
      <main>
          <TaskAdd
              taskInput={taskInput}
              handleAddTask={handleAddTask}
              updateTasks={updateTasks}
              currentCategory={currentCategory}
              isDone={isDone}
          />
          <TodosFilter
              currentCategory={currentCategory}
              handleChangeCategory={handleChangeCategory}
              numberOfAllTasks={numberOfAllTasks}
              numberOfInWorkTasks={numberOfInWorkTasks}
              numberOfCompletedTasks={numberOfCompletedTasks}

          />
          <TaskList
              tasks={userTasks}
              isLoading={isFetching}
              loadingText="Loading..."
              onHandleDisableEditMode={disableEditMode}
              onEnableEditMode={enableEditMode}
              onSelectStatus={onSelectStatus}
              onSelectDelete={onSelectDelete}
              editTaskIs={editTaskIs}
              onSelectEditModeCloseNoSave={onSelectEditModeCloseNoSave}
              editedTask={editTaskIs}
              updateTasks={updateTasks}
              currentCategory={currentCategory}
          />
      </main>
  )
}

export default TodoListPage