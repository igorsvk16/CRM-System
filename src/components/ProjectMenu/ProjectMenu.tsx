import classes from "./ProjectMenu.module.css"

const ProjectMenu = () => {
    return (
        <div className={classes.leftSidebar}>
            <h3>Pulse CRM</h3>
            <button>Доска</button>
            <button>Список задач</button>
            <button>Аналитика</button>
            <button>Пользователи</button>
            <h3>НАСТРОЙКИ ПРОЕКТА</h3>
            <button>Параметры проекта</button>
        </div>
    )
}

export default ProjectMenu;