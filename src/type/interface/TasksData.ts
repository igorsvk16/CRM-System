export type TaskData = {
    id: number;
    title: string;
    description: string;
    createdAt: string;
    creator: Author
    executor: Author;
    status: string;
    updatedAt: string;
}

type Author = {
    id: number;
    name: string;
}

export type TasksData = {
    data: TaskData[];
    meta: object;
    tasks: Array<TaskData>;
};

