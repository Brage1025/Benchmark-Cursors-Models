# Task summary

A small TypeScript utility that counts tasks by status. It has no dependencies.

## Requirements

- Node.js 22.18 or newer (this project was run on Node.js 26). Node runs the TypeScript tests directly, so nothing needs to be installed.

## Run the tests

From this directory:

```bash
node --test src/summarizeTasks.test.ts
```

Or, if `npm` is available:

```bash
npm test
```

`node --test` checks runtime behavior. It does not type-check the source. The types in `src/summarizeTasks.ts` are the compile-time contract.

## API

`summarizeTasks` accepts a read-only array of tasks:

- `id`: number
- `title`: string
- `status`: `"todo"`, `"in-progress"`, or `"done"`

It returns:

- `total`: number of tasks
- `completed`: tasks with status `"done"`
- `remaining`: tasks that are not done (`"todo"` plus `"in-progress"`)
- `byStatus`: a count for every status, including statuses that appear zero times

An empty array returns zeros for every count. The function only reads the input array.
