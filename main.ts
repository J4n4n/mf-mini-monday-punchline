// Monday Morning Punchlines — take the bot's one-liner, copy it to the
// output directory, and make sure it fits the 200-character budget.
import * as fs from "node:fs";
import * as path from "node:path";

const LIMIT = 200;
const FILENAME = "entry.txt";

function readEntry(botDir: string, outDir: string): string {
  const src = path.join(botDir, FILENAME);
  const dst = path.join(outDir, FILENAME);
  fs.mkdirSync(outDir, { recursive: true });
  fs.copyFileSync(src, dst);
  const raw = fs.readFileSync(dst, "utf8");
  // The closing newline is the editor's line ending, not part of the
  // punchline itself, so strip exactly one trailing newline if present.
  return raw.endsWith("\n") ? raw.slice(0, raw.length - 1) : raw;
}

function fail(msg: string): void {
  console.error(msg);
  process.exit(1);
}

const botDir = process.env.MAKEFUN_BOT_DIR ?? "/bot";
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const punchline = readEntry(botDir, outDir);

if (punchline.length === 0) {
  fail("Error: entry.txt is empty.");
}

if (punchline.length > LIMIT) {
  fail(`Error: entry is ${punchline.length} characters, over the ${LIMIT} character limit.`);
}

console.log(`Character count: ${punchline.length}`);
console.log(punchline);
