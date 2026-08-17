class Todo {
    id: number;
    title: string;
    isDone: boolean;

    constructor(id: number, todoText: string, status: boolean) {
        this.title = todoText;
        this.id = id;
        this.isDone = status;
    }
}

export default Todo;