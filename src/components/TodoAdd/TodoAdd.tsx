import {useState, SetStateAction} from "react";
import {addTodo} from "../../api/http.js";
import checkTitleValidation from '../../utils/helpers/checkTitleValidation.ts';
import classes from "./TodoAdd.module.css";
import React = require("react");

const TodoAdd: React.FC<({ updateTodos: (text: string) => void, currentCategory: string })> = (props) => {

    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [todoInput, setTodoInput] = useState<string>("");
    const [todoDescription, setTodoDescription] = useState<string>("");

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

    const toggleOpenAddTaskMenu = () => {
        setIsAddModalOpen(true)
    }
    return (
        <>
            <div className={classes.addButtonContainer}>
                 <h3>Доска Pulse CRM</h3>
                <button
                    onClick={toggleOpenAddTaskMenu}
                    className={classes.addButton}
                >
                   Создать
                </button>
            </div>
        {isAddModalOpen && (
            <div className={classes.modalBackground}>
                <div className={classes.addTaskModalContainer}>
                    <form onSubmit={fetchAddTodo} className={classes.todoAdd}>
                        <h3>Новая задача</h3>
                        <p>* Название</p>
                            <input
                                type="text"
                                id="text"
                                value={todoInput}
                                onChange={(e: { target: { value: SetStateAction<string>; }; }) => {
                                    setTodoInput(e.target.value);
                                }}
                                className={classes.inputNewTodo}
                            />

                        <p>Описание</p>
                        <input
                            type="text"
                            id="text"
                            value={todoDescription}
                            onChange={(e: { target: { value: SetStateAction<string>; }; }) => {
                                setTodoDescription(e.target.value);
                            }}
                            placeholder="Опишите задачу, добавьте заголовки и списки…"
                            className={classes.descriptionNewTodo}
                        />

                        <div className={classes.newTodoPersonAndStatus}>
                            <div>
                                <p>Исполнитель</p>
                                <div className={classes.dropDownMenuExecutor}>
                                    {users.map(user: User) => (
                                        <a></a>
                                        )}
                                </div>
                            </div>
                            <div>
                                <p>Статус</p>
                                <input/>
                            </div>
                        </div>

                        <div className={classes.saveOrCancelNewTask}>
                            <button>
                                Отмена
                            </button>

                            <button>
                                Добавить
                            </button>
                        </div>
                    </form>

                </div>
            </div>
        )}
        </>
    );
};

export default TodoAdd;

