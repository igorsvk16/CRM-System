import classes from "./Header.module.css"
import SaveButton from "../../ui/SaveButton/SaveButton.tsx";

const Header = () => {
    return (
        <header className={classes.headerContainer}>
            <h1>
                Pulse CRM
            </h1>
            <button>Рабочий стол</button>
            <button>Задачи</button>
            <button>Команда</button>
            <SaveButton text={"Создать"}></SaveButton>
        </header>
    )
}

export default Header;