export interface TaskExecution {
    startTime: Date;
    endTime: Date;
    output: string;
}

export interface Task {
    id: string;
    name: string;
    owner: string;
    command: string;
    taskExecutions: TaskExecution[];
}