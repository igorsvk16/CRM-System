// export type TasksData = {
//     data: TaskData[];
//     // data: Array<TaskData>;
//     total: number
//     meta: object;
// };

export type TasksData = Partial<TaskData> & {
    data: TaskData[];
    // data: Array<TaskData>;
    total: number
    meta: object;
};

export type TaskData = {
    id: number;
    title: string;
    description: string;
    executor: Author;
    creator: Author
    status: string;
    deadline: string;
    createdAt: string;
    updatedAt: string;
}

type Author = {
    id: number;
    name: string;
}

