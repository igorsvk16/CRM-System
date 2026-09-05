export type TaskData = {
    createdAt: string;
    creator: {name: string};
    description: string;
    executor: {name: string};
    id: number;
    status: string;
    title: string;
    updatedAt: string;
}

export type TasksData = TaskData[];