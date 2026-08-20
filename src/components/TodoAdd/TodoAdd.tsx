import React, {useState, SetStateAction} from "react";
import {addTodo} from "../../api/http.js";
import checkTitleValidation from "../../utils/helpers/checkTitleValidation.js";
import classes from "./TodoAdd.module.css";

const TodoAdd: React.FC<({ updateTodos: (text: string) => void, currentCategory: string })> = (props) => {

    let isDone = false;

    const [todoInput, setTodoInput] = useState<string>("");

    const fetchAddTodo = (event: React.FormEvent) => {
        event.preventDefault();
        const validateTitle = checkTitleValidation(todoInput);
        console.log("validateTitle")
        if (validateTitle) {
            alert(validateTitle);
        } else {
            console.log(todoInput);
            addTodo(todoInput, isDone)
                .then(() => {
                        props.updateTodos(props.currentCategory);
                        setTodoInput('');
                    }, reason => {
                        alert("Ошибка при добавлении задачи");
                        alert(reason);
                    }
                )
        }
    }
    return (
        <form onSubmit={fetchAddTodo} className={classes.todoAdd}>
            <input
                type="text"
                id="text"
                value={todoInput}
                onChange={(e: { target: { value: SetStateAction<string>; }; }) => {
                    setTodoInput(e.target.value);
                }}
                placeholder="Новая задача..."
                className={classes.inputNewTodo}
            />
            <button
                className={classes.addButton}
            >
                Добавить
            </button>
        </form>
    );
};

export default TodoAdd;

