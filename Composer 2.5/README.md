# Task summarizer

TypeScript utility that computes counts and status breakdowns for a list of tasks.

## Setup

Requires [Node.js](https://nodejs.org/) 18 or newer (built-in test runner).

```bash
npm install
```

## Run tests

```bash
npm test
```

This compiles TypeScript to `dist/` and runs tests with Node’s built-in `node:test` runner (no Jest or other test libraries).

## Usage

```typescript
import { summarizeTasks } from "./summarizeTasks.js";

const summary = summarizeTasks([
  { id: 1, title: "Example", status: "todo" },
]);
```
