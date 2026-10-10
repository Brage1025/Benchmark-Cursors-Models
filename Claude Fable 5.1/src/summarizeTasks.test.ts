import { describe, it } from "node:test";
import assert from "node:assert/strict";

import { summarizeTasks, type Task } from "./summarizeTasks.ts";

describe("summarizeTasks", () => {
  it("returns all zeros for an empty array", () => {
    const summary = summarizeTasks([]);

    assert.deepEqual(summary, {
      total: 0,
      completed: 0,
      remaining: 0,
      byStatus: { todo: 0, "in-progress": 0, done: 0 },
    });
  });

  it("summarizes a typical list with tasks in all three statuses", () => {
    const tasks: Task[] = [
      { id: 1, title: "Write spec", status: "done" },
      { id: 2, title: "Implement feature", status: "in-progress" },
      { id: 3, title: "Write tests", status: "todo" },
      { id: 4, title: "Review PR", status: "todo" },
      { id: 5, title: "Set up CI", status: "done" },
    ];

    const summary = summarizeTasks(tasks);

    assert.deepEqual(summary, {
      total: 5,
      completed: 2,
      remaining: 3,
      byStatus: { todo: 2, "in-progress": 1, done: 2 },
    });
  });

  it("reports zero for statuses that are not present", () => {
    const tasks: Task[] = [
      { id: 1, title: "Only todo", status: "todo" },
      { id: 2, title: "Another todo", status: "todo" },
    ];

    const summary = summarizeTasks(tasks);

    assert.equal(summary.total, 2);
    assert.equal(summary.completed, 0);
    assert.equal(summary.remaining, 2);
    assert.deepEqual(summary.byStatus, { todo: 2, "in-progress": 0, done: 0 });
  });

  it("counts a fully completed list as having no remaining tasks", () => {
    const tasks: Task[] = [
      { id: 1, title: "A", status: "done" },
      { id: 2, title: "B", status: "done" },
    ];

    const summary = summarizeTasks(tasks);

    assert.equal(summary.total, 2);
    assert.equal(summary.completed, 2);
    assert.equal(summary.remaining, 0);
  });

  it("keeps total equal to completed + remaining and to the sum of byStatus", () => {
    const tasks: Task[] = [
      { id: 1, title: "A", status: "todo" },
      { id: 2, title: "B", status: "in-progress" },
      { id: 3, title: "C", status: "in-progress" },
      { id: 4, title: "D", status: "done" },
    ];

    const summary = summarizeTasks(tasks);
    const sumOfStatuses = Object.values(summary.byStatus).reduce((a, b) => a + b, 0);

    assert.equal(summary.completed + summary.remaining, summary.total);
    assert.equal(sumOfStatuses, summary.total);
  });

  it("does not mutate the input array or its tasks", () => {
    const tasks: Task[] = [
      { id: 1, title: "A", status: "todo" },
      { id: 2, title: "B", status: "done" },
    ];
    const snapshot = structuredClone(tasks);
    const originalReferences = [...tasks];

    summarizeTasks(tasks);

    assert.deepEqual(tasks, snapshot);
    assert.equal(tasks.length, originalReferences.length);
    for (let i = 0; i < tasks.length; i++) {
      assert.equal(tasks[i], originalReferences[i]);
    }
  });

  it("accepts a frozen (readonly) array", () => {
    const tasks: readonly Task[] = Object.freeze([
      { id: 1, title: "A", status: "in-progress" as const },
    ]);

    const summary = summarizeTasks(tasks);

    assert.equal(summary.total, 1);
    assert.equal(summary.byStatus["in-progress"], 1);
  });
});
