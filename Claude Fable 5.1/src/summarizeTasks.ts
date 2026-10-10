/**
 * The set of valid task statuses.
 *
 * Kept as a readonly tuple so the `TaskStatus` union type is derived from it
 * and the runtime list of statuses stays in sync with the type automatically.
 */
export const TASK_STATUSES = ["todo", "in-progress", "done"] as const;

export type TaskStatus = (typeof TASK_STATUSES)[number];

export interface Task {
  id: number;
  title: string;
  status: TaskStatus;
}

/**
 * Summary of a list of tasks.
 *
 * - `total`: number of tasks in the list.
 * - `completed`: number of tasks with status `"done"`.
 * - `remaining`: number of tasks not yet done (`"todo"` + `"in-progress"`).
 * - `byStatus`: per-status counts. Every status is always present, even when
 *   its count is zero, so consumers never need to guard against `undefined`.
 */
export interface TaskSummary {
  total: number;
  completed: number;
  remaining: number;
  byStatus: Record<TaskStatus, number>;
}

/** Builds a `byStatus` record with every status initialised to zero. */
function createEmptyStatusCounts(): Record<TaskStatus, number> {
  const counts = {} as Record<TaskStatus, number>;
  for (const status of TASK_STATUSES) {
    counts[status] = 0;
  }
  return counts;
}

/**
 * Summarises a list of tasks.
 *
 * The input is accepted as `readonly Task[]` and is never mutated; the
 * function only reads from it in a single pass.
 */
export function summarizeTasks(tasks: readonly Task[]): TaskSummary {
  const byStatus = createEmptyStatusCounts();

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
