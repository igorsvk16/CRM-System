import classes from "./Header.module.css"

const Header = () => {
    return (
        <header className={classes.headerContainer}>
            <h1>
                Pulse CRM
            </h1>
            <button>Рабочий стол</button>
            <button>Задачи</button>
            <button>Команда</button>
            <button className={classes.addButton}>Создать</button>
        </header>
    )
}

export default Header;