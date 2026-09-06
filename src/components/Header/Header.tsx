import classes from "./Header.module.css"

const Header = () => {
    return (
        <>
                <div className={classes.headerContainer}>
                    <h1>
                        Pulse CRM
                    </h1>
                    <p>Рабочий стол</p>
                    <p>Задачи</p>
                    <p>Команда</p>
                    <button className={classes.addButton}>Создать</button>
                </div>
        </>
    )
}

export default Header;