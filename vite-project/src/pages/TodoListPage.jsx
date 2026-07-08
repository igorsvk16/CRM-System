import TaskAdd from "../components/TaskAdd.jsx";
import TodosFilter from "../components/TodosFilter.jsx";
import TaskList from "../components/TaskList.jsx";

export default function TodoListPage({taskInput, handleAddTask, setTaskInput, currentCategory, handleChangeCategory, numberOfAllTasks, numberOfInWorkTasks,
                                         numberOfCompletedTasks, userTasks, isFetching, onHandleDisableEditMode, onEnableEditMode, onSelectStatus, onSelectDelete,
                                         editTaskIs, onSelectEditModeCloseNoSave, editedTask}) {
    console.log(userTasks)
    return (
        <>
        <TaskAdd
            taskInput={taskInput}
            handleAddTask={handleAddTask}
            setTaskInput={setTaskInput}
        />
        <TodosFilter
            currentCategory={currentCategory}
            handleChangeCategory={handleChangeCategory}
            numberOfAllTasks={numberOfAllTasks}
            numberOfInWorkTasks={numberOfInWorkTasks}
            numberOfCompletedTasks={numberOfCompletedTasks}
        />
        <TaskList
            userTasks={userTasks}
            isFetching={isFetching}
            loadingText="Loading..."
            onHandleDisableEditMode={onHandleDisableEditMode}
            onEnableEditMode={onEnableEditMode}
            onSelectStatus={onSelectStatus}
            onSelectDelete={onSelectDelete}
            editTaskIs={editTaskIs}
            onSelectEditModeCloseNoSave={onSelectEditModeCloseNoSave}
            editedTask={editedTask}

        />
        </>
    )}
