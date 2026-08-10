import {MAX_LENGTH, MIN_LENGTH} from "../../constants.jsx";

export default function checkValidation(todoInput, setTodoInput) {
    if (todoInput.trim().length > MAX_LENGTH) {
        alert("Максимальная длина текста 64 символа");
        return false;
    } else if (todoInput.trim().length === MIN_LENGTH - 1) {
        alert("Минимальная длина текста 2 символа");
        return false;
    } else if (todoInput.trim().length === 0) {
        setTodoInput('');
        alert("Введите текст, не пробелы");
        return false;
    } else {
        return true;
    }
}