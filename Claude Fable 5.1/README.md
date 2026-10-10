# task-summary

A small, dependency-free TypeScript utility that summarizes a list of tasks.

```ts
import { summarizeTasks, type Task } from "./src/summarizeTasks.ts";

const tasks: Task[] = [
  { id: 1, title: "Write spec", status: "done" },
  { id: 2, title: "Implement feature", status: "in-progress" },
  { id: 3, title: "Write tests", status: "todo" },
];

summarizeTasks(tasks);
// {
//   total: 3,
//   completed: 1,
//   remaining: 2,
//   byStatus: { todo: 1, "in-progress": 1, done: 1 },
// }
```

## Requirements

- Node.js **22.6 or newer** (Node 23.6+ recommended). Tests run directly on
  the `.ts` sources using Node's built-in TypeScript type stripping and the
  built-in `node:test` runner, so no test framework or transpiler is needed.
- `npm` (ships with Node).

> On Node 22.6–23.5, prefix the test command with
> `--experimental-strip-types`, e.g. `node --experimental-strip-types --test "src/**/*.test.ts"`.
> From Node 23.6 onward type stripping is enabled by default.

## Setup

```sh
npm install
```

This installs only `typescript` and `@types/node` as dev dependencies. They are
used for type checking (`tsc --noEmit`) and editor support; the runtime code
and tests have no dependencies at all.

## Running the tests

```sh
npm test
```

Type-check the project:

```sh
npm run typecheck
```

Run both:

```sh
npm run check
```

## Project layout

```
src/
  summarizeTasks.ts        # implementation and exported types
  summarizeTasks.test.ts   # unit tests (node:test + node:assert)
package.json
tsconfig.json
```

## API

### `summarizeTasks(tasks: readonly Task[]): TaskSummary`

Returns:

| Field       | Type                         | Meaning                                              |
| ----------- | ---------------------------- | ---------------------------------------------------- |
| `total`     | `number`                     | Number of tasks in the list                          |
| `completed` | `number`                     | Tasks with status `"done"`                           |
| `remaining` | `number`                     | Tasks not yet done (`"todo"` + `"in-progress"`)      |
| `byStatus`  | `Record<TaskStatus, number>` | Count per status; every status is present (may be 0) |

### Types

```ts
export const TASK_STATUSES = ["todo", "in-progress", "done"] as const;
export type TaskStatus = (typeof TASK_STATUSES)[number];

export interface Task {
  id: number;
  title: string;
  status: TaskStatus;
}

export interface TaskSummary {
  total: number;
  completed: number;
  remaining: number;
  byStatus: Record<TaskStatus, number>;
}
```

## Design notes

- **Single source of truth for statuses.** `TASK_STATUSES` is a readonly
  tuple and `TaskStatus` is derived from it. Adding a status is a one-line
  change; the type, the zero-initialised `byStatus` record, and the compiler
  errors on unhandled cases all follow automatically.
- **`byStatus` always contains every key.** Counts are initialised to zero
  before iterating, so callers can read `summary.byStatus.done` without
  `undefined` checks, and an empty input yields an all-zero summary rather
  than an empty object.
- **No mutation.** The parameter is typed `readonly Task[]`, which both
  documents the contract and makes any accidental mutation a compile error.
  The function performs a single read-only pass and builds a new result
  object.
- **Derived fields are computed, not counted twice.** `completed` is read
  from `byStatus.done` and `remaining` is `total - completed`, so the
  invariants `total === completed + remaining` and
  `total === sum(byStatus)` hold by construction.
