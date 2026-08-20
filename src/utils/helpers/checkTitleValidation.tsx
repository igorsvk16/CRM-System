import {MAX_LENGTH, MIN_LENGTH} from "../../constants.tsx";

export default function checkTitleValidation(todoInput) {
    if (todoInput.trim().length > MAX_LENGTH) {
        return "Максимальная длина текста 64 символа";
    } else if (todoInput.trim().length === MIN_LENGTH - 1) {
        return "Минимальная длина текста 2 символа";
    } else if (todoInput.trim().length === 0) {
        return "Введите текст, не пробелы";
    }
}