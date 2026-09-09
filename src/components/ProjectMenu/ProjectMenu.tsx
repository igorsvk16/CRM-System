import classes from "./ProjectMenu.module.css"

const ProjectMenu = () => {
    return (
        <div className={classes.leftSidebar}>
            <p>Доска</p>
            <p>Список задач</p>
            <p>Аналитика</p>
            <p>Пользователи</p>
            <h3>НАСТРОЙКИ ПРОЕКТА</h3>
            <p>Параметры проекта</p>
        </div>
    )
}

export default ProjectMenu;