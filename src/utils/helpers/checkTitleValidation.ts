import {MAX_LENGTH, MIN_LENGTH} from "../../constants.ts";

export default function checkTitleValidation(todoInput: string): string {
    const inputTrimmedLength = todoInput.trim().length;
    
    if (inputTrimmedLength > MAX_LENGTH) {
        return "Максимальная длина текста 64 символа";
    } else if (inputTrimmedLength === MIN_LENGTH - 1) {
        return "Минимальная длина текста 2 символа";
    } else if (inputTrimmedLength === 0) {
        return "Введите текст, не пробелы";
    }

    return '';
}