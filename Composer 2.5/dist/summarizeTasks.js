const EMPTY_STATUS_COUNTS = {
    todo: 0,
    "in-progress": 0,
    done: 0,
};
/**
 * Summarizes a list of tasks without mutating the input array.
 */
export function summarizeTasks(tasks) {
    const byStatus = { ...EMPTY_STATUS_COUNTS };
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
