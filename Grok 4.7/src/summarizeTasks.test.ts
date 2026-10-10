import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { summarizeTasks, type Task } from "./summarizeTasks.ts";

describe("summarizeTasks", () => {
  it("summarizes a typical list of tasks", () => {
    const tasks: Task[] = [
      { id: 1, title: "Write the spec", status: "done" },
      { id: 2, title: "Implement the utility", status: "done" },
      { id: 3, title: "Ask for review", status: "todo" },
    ];

    assert.deepEqual(summarizeTasks(tasks), {
      total: 3,
      completed: 2,
      remaining: 1,
      byStatus: {
        todo: 1,
        "in-progress": 0,
        done: 2,
      },
    });
  });

  it("returns zeros for an empty list", () => {
    assert.deepEqual(summarizeTasks([]), {
      total: 0,
      completed: 0,
      remaining: 0,
      byStatus: {
        todo: 0,
        "in-progress": 0,
        done: 0,
      },
    });
  });

  it("counts a list that contains every status", () => {
    const tasks: Task[] = [
      { id: 1, title: "Draft the outline", status: "done" },
      { id: 2, title: "Fill in the examples", status: "in-progress" },
      { id: 3, title: "Proofread", status: "todo" },
      { id: 4, title: "Publish", status: "todo" },
      { id: 5, title: "Share the link", status: "in-progress" },
    ];

    const summary = summarizeTasks(tasks);

    assert.deepEqual(summary, {
      total: 5,
      completed: 1,
      remaining: 4,
      byStatus: {
        todo: 2,
        "in-progress": 2,
        done: 1,
      },
    });
    assert.equal(
      summary.remaining,
      summary.byStatus.todo + summary.byStatus["in-progress"],
    );
  });

  it("does not mutate the input list or its tasks", () => {
    const tasks: Task[] = [
      { id: 1, title: "Keep this list intact", status: "todo" },
      { id: 2, title: "Finish the write-up", status: "in-progress" },
      { id: 3, title: "Ship it", status: "done" },
    ];
    const snapshot = structuredClone(tasks);

    summarizeTasks(tasks);

    assert.deepEqual(tasks, snapshot);
    assert.equal(tasks[0]?.title, "Keep this list intact");
  });
});
