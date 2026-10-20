export type AllTasksData = {
    data: Array<TaskData>;
    total: number;
    meta: MetaData;
}

export type MetaData = {
    limit: number;
    offset: number;
    statuses: [
        string
    ],
    executorId: number;
    orderBy: string;
    orderDir: string;
    statusCounts: StatusCounts;
}

export type StatusCounts = {
    backlog: number;
    todo: number;
    inProgress: number;
    review: number;
    readyForRelease: number;
    onHold: number;
    done: number;
}

export type TaskData = {
        id: number;
        title: string;
        description: string;
        executor: Author;
        creator: Author;
        status: string;
        deadline: string;
        createdAt: string;
        updatedAt: string;
}

export type Author = {
    id: number;
    name: string;
}
