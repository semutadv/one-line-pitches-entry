// A Day of One-Line Pitches — entry program.
//
// Writes the single pitch sentence for this entry to entry.txt inside the
// output directory. The grader mounts that directory, so this program only
// ever clears the directory's contents and never removes the directory
// itself.

import { mkdirSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The whole entry: one sentence, 187 characters, aimed at a friend who has
// never written a line of code.
const PITCH =
  "You've said 'someone should make an app for that' for three years — type that one sentence into make.fun tonight, an AI agent builds it while you sleep, and tomorrow the someone is you.";

function prepareOutputDir(): string {
  // Honour an explicit override (used by local test runs); the grader leaves
  // it unset, so the program writes to /output there.
  const dir = process.env.OUTPUT_DIR ?? "/output";
  mkdirSync(dir, { recursive: true });
  return dir;
}

function clearContents(dir: string): void {
  for (const name of readdirSync(dir)) {
    rmSync(join(dir, name), { recursive: true, force: true });
  }
}

function main(): void {
  const dir = prepareOutputDir();
  clearContents(dir);
  writeFileSync(join(dir, "entry.txt"), PITCH + "\n", "utf8");
}

main();
