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

const EMPTY_STATUS_COUNTS: StatusCounts = {
  todo: 0,
  "in-progress": 0,
  done: 0,
};

/**
 * Summarizes a list of tasks without mutating the input array.
 */
export function summarizeTasks(tasks: readonly Task[]): TaskSummary {
  const byStatus: StatusCounts = { ...EMPTY_STATUS_COUNTS };

  for (const task of tasks) {
    byStatus[task.status] += 1;
  }

  const completed = byStatus.done;
  const total = tasks.length;
  const remaining = total - completed;

  return {
    total,
    completed,
    remaining,
    byStatus,
  };
}
