import classes from "./Header.module.css"

const Header = () => {
    return (
        <header className={classes.headerContainer}>
            <h1>
                Pulse CRM
            </h1>
            <p>Рабочий стол</p>
            <p>Задачи</p>
            <p>Команда</p>
            <button className={classes.addButton}>Создать</button>
        </header>
    )
}

export default Header;