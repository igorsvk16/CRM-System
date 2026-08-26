import {useState, SetStateAction} from "react";
import {addTodo} from "../../api/http.js";
import checkTitleValidation from '../../utils/helpers/checkTitleValidation.ts';
import classes from "./TodoAdd.module.css";
import React = require("react");
import AddButton from "../../ui/AddButton/AddButton.tsx";

const TodoAdd: React.FC<({ updateTodos: (text: string) => void, currentCategory: string })> = (props) => {

    const [todoInput, setTodoInput] = useState<string>("");

    const fetchAddTodo = (event: React.SubmitEvent<HTMLFormElement>) => {
        event.preventDefault();
        const validateTitle = checkTitleValidation(todoInput);
        if (validateTitle) {
            alert(validateTitle);
        } else {
            addTodo(todoInput)
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
            <AddButton text="Добавить" />
        </form>
    );
};

export default TodoAdd;

