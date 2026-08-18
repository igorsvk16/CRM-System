import React, {useState, useRef} from "react";
import {addTodo} from "../../api/http.js";
import checkTitleValidation from "../../utils/helpers/checkTitleValidation.jsx";
import styles from "./TodoAdd.module.css";

const TodoAdd: React.FC<({ updateTodos: (text: string) => void, currentCategory: string })> = (props) =>  {
    const todoTextInputRef = useRef<HTMLInputElement>(null);

    let isDone= false;

    const [ todoInput, setTodoInput ] = useState<string>("");

    const fetchAddTodo(e: React.FormEvent) => {
        // const enteredText = todoTextInputRef.current!.value;
        const validateTitle = checkTitleValidation(enteredText);
        if (validateTitle) {
            alert(validateTitle);
        } else {
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
        <form onSubmit={fetchAddTodo} className={styles.todoAdd}>
            <label htmlFor="text">Текст задачи</label>
            <input
                type="text"
                id="text"
                value={todoInput}
                // ref={todoTextInputRef}
                onChange={e => {
                    setTodoInput(e.target.value);
                }}
                placeholder="Новая задача..."
                className={styles.inputNewTodo}
            />
            <button
                className={styles.addButton}
            >
                Добавить
            </button>
        </form>
    );
};

export default TodoAdd;

    // let isDone= false;
    //
    // const [ todoInput, setTodoInput ] = useState("");
    //
    // function fetchAddTodo() {
    //     const validateTitle = checkTitleValidation(todoInput);
    //     if (validateTitle) {
    //         alert(validateTitle);
    //     } else {
    //         addTodo(todoInput, isDone)
    //             .then(() => {
    //                     updateTodos(currentCategory);
    //                     setTodoInput('');
    //                 }, reason => {
    //                     alert("Ошибка при добавлении задачи");
    //                     alert(reason);
    //                 }
    //             )
    //     }
    // }

