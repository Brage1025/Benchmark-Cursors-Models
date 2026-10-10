import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { summarizeTasks } from "./summarizeTasks.js";
describe("summarizeTasks", () => {
    it("returns zeros for an empty array", () => {
        const result = summarizeTasks([]);
        assert.deepEqual(result, {
            total: 0,
            completed: 0,
            remaining: 0,
            byStatus: { todo: 0, "in-progress": 0, done: 0 },
        });
    });
    it("summarizes a typical mixed list", () => {
        const tasks = [
            { id: 1, title: "Write docs", status: "done" },
            { id: 2, title: "Review PR", status: "in-progress" },
            { id: 3, title: "Fix bug", status: "todo" },
            { id: 4, title: "Ship feature", status: "done" },
        ];
        const result = summarizeTasks(tasks);
        assert.equal(result.total, 4);
        assert.equal(result.completed, 2);
        assert.equal(result.remaining, 2);
        assert.deepEqual(result.byStatus, {
            todo: 1,
            "in-progress": 1,
            done: 2,
        });
    });
    it("counts all three status categories", () => {
        const tasks = [
            { id: 1, title: "A", status: "todo" },
            { id: 2, title: "B", status: "in-progress" },
            { id: 3, title: "C", status: "done" },
        ];
        const result = summarizeTasks(tasks);
        assert.equal(result.total, 3);
        assert.equal(result.completed, 1);
        assert.equal(result.remaining, 2);
        assert.deepEqual(result.byStatus, {
            todo: 1,
            "in-progress": 1,
            done: 1,
        });
    });
    it("does not mutate the input array", () => {
        const tasks = [{ id: 1, title: "Only", status: "todo" }];
        const snapshot = structuredClone(tasks);
        summarizeTasks(tasks);
        assert.deepEqual(tasks, snapshot);
    });
});
