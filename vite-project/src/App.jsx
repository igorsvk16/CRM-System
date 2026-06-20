import Task from "./components/Task.jsx";
import { fetchAddTask, fetchTaskIsDone, fetchUserTasks, saveEditedTask, deleteTaskById } from "./api/http.js";
import './App.module.css'
import {useEffect, useState } from "react";
import {getNumberOfTasks} from "./api/http.js";
import styles from "./App.module.css";

function App() {
    const [ userTasks, setUserTasks ] = useState([]);
    const [ isFetching, setIsFetching] = useState(false);
    const [ numberOfAllTasks,  setNumberOfAllTasks] = useState();
    const [ numberOfInWorkTasks,  setNumberOfInWorkTasks] = useState();
    const [ numberOfCompletedTasks, setNumberOfCompletedTasks] = useState();
    const [ editTaskIs, setEditTaskIs ] = useState();
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
        console.log("1!!!updateTasks(currentCategory")
        try {
            const tasks = await fetchUserTasks(currentCategory);
            setUserTasks(tasks);
            taskCounter();
            console.log("2!!!updateTasks(currentCategory")
        } catch (error) {
            alert('Ошибка при обновлении задач');
        }
    }

    async function handleAddTask() {
        try {
                if (taskInput.length >= 2 && taskInput.length <= 64) {
                    await fetchAddTask(taskInput, isDone);
                    updateTasks(currentCategory);
                    setTaskInput('');
            } else {
                    if (taskInput.length >= 2) {
                        alert("Максимальная длина текста 64 символа")
                    } else {
                        alert("Минимальная длина текста 2 символа")
                    }
            }
        } catch (error) {
            alert("Не получилось добавить задачу");
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
            alert("Не получилось посчитать количество задач");
        }
    }

    async function enableEditMode(task) {
        setEditTaskIs(task);
    }

    async function disableEditMode(id, isDone, taskInput) {
        if (taskInput.length) {
            if (taskInput.length >= 2 && taskInput.length <= 64) {
                try {
                    await saveEditedTask(id, isDone, taskInput);
                    updateTasks(currentCategory);
                    setEditTaskIs("");
                    setTaskInput("");
                } catch (error) {
                    alert("Не получилось отредактировать задачу")
                }
            } else {
                if (taskInput.length > 64) {
                    alert("Максимальная длина текста 64 символа")
                } else {
                    alert("Минимальная длина текста 2 символа")
                }
            }
        //     если задача сохранена без изменений
        } else {
                setEditTaskIs("");
                setTaskInput("");
            }
        }

    async function onSelectEditModeCloseNoSave(id, isDone, value, title, inputRef) {
        console.log("onSelectEditModeCloseNoSave");
        setEditTaskIs("");
        setTaskInput("");
        // updateTasks("all");

        // console.log(id);
        // console.log(newInput);
        // console.log(title);
        //
        // setEditTaskIs();
        //
        // await updateTasks(currentCategory);
        // value = "";
        // inputRef = null;
        // setTaskInput("");
        // inputRef = null;
        // try {
        //     await saveEditedTask(id, isDone, title);
        //     updateTasks(currentCategory);
        //     setEditTaskIs("");
        //     setTaskInput("");
        // } catch (error) {
        //     alert("Не получилось отредактировать задачу")
        // }


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

    async function onSelectDelete(id) {
        try {
            await deleteTaskById(id);
        } catch (error) {
            // alert("Не получилось удалить задачу");
        }
        updateTasks(currentCategory);
    }

  return (
    <>
        <main>
            <div className={styles.taskAdd}>
                  <input
                      className={styles.inputNewTask}
                      value={taskInput}
                      onChange={e => {setTaskInput(e.target.value)}}
                      type="text"
                      placeholder="Task To Be Done..."
                  />
                  <button
                      onClick={handleAddTask}
                      className={styles.addButton}
                  >
                      <p>Add</p>
                  </button>
                </div>
            <div className={styles.tasksСategories}>

                {currentCategory === 'all' ? (
                    <div className={styles.taskCategoryActive}>
                        <button onClick={() => handleChangeCategory('all')}>
                            <p>Все ({numberOfAllTasks})</p>
                        </button>
                    </div>
                ) : (
                    <div className={styles.taskCategory}>
                        <button onClick={() => handleChangeCategory('all')}>
                            <p>Все ({numberOfAllTasks})</p>
                        </button>
                    </div>
                )}

                {currentCategory === 'inWork' ? (
                    <div className={styles.taskCategoryActive}>
                        <button onClick={() => handleChangeCategory('inWork')}>
                            <p>В работе ({numberOfInWorkTasks})</p>
                        </button>
                    </div>
                ) : (
                    <div className={styles.taskCategory}>
                        <button onClick={() => handleChangeCategory('inWork')}>
                            <p>В работе ({numberOfInWorkTasks})</p>
                        </button>
                    </div>
                )}

                {currentCategory === 'completed' ? (
                    <div className={styles.taskCategoryActive}>
                        <button onClick={() => handleChangeCategory('completed')}>
                            <p>Сделано ({numberOfCompletedTasks})</p>
                        </button>
                    </div>
                ) : (
                    <div className={styles.taskCategory}>
                        <button onClick={() => handleChangeCategory('completed')}>
                            <p>Сделано ({numberOfCompletedTasks})</p>
                        </button>
                    </div>
                )}

            </div>

        <Task
            tasks={userTasks}
            isLoading={isFetching}
            loadingText="Loading..."
            onHandleDisableEditMode={disableEditMode}
            onEnableEditMode={enableEditMode}
            onSelectStatus={onSelectStatus}
            onSelectDelete={onSelectDelete}
            taskInput={taskInput}
            editTaskIs={editTaskIs}
            onSelectEditModeCloseNoSave={onSelectEditModeCloseNoSave}
        />
        </main>
    </>
  )
}

export default App