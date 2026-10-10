export type TaskStatus = "todo" | "in-progress" | "done";
export interface Task {
    id: number;
    title: string;
    status: TaskStatus;
}
export interface StatusCounts {
    todo: number;
    "in-progress": number;
    done: number;
}
export interface TaskSummary {
    total: number;
    completed: number;
    remaining: number;
    byStatus: StatusCounts;
}
/**
 * Summarizes a list of tasks without mutating the input array.
 */
export declare function summarizeTasks(tasks: readonly Task[]): TaskSummary;
