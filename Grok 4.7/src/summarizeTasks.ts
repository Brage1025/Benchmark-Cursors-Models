export type TaskStatus = "todo" | "in-progress" | "done";

export interface Task {
  readonly id: number;
  readonly title: string;
  readonly status: TaskStatus;
}

/** Count of tasks in each status. Every status is always present. */
export type StatusCounts = Record<TaskStatus, number>;

export interface TaskSummary {
  readonly total: number;
  readonly completed: number;
  readonly remaining: number;
  readonly byStatus: StatusCounts;
}

/**
 * Summarize tasks in one read-only pass.
 *
 * `completed` is the number of tasks with status `"done"`.
 * `remaining` is every other task (`"todo"` plus `"in-progress"`).
 * An empty list returns zeros for every count.
 */
export function summarizeTasks(tasks: readonly Task[]): TaskSummary {
  const byStatus = emptyStatusCounts();

  for (const task of tasks) {
    byStatus[task.status] += 1;
  }

  const total = tasks.length;
  const completed = byStatus.done;

  return {
    total,
    completed,
    remaining: total - completed,
    byStatus,
  };
}

function emptyStatusCounts(): StatusCounts {
  return {
    todo: 0,
    "in-progress": 0,
    done: 0,
  };
}
