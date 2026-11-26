// Monday Morning Punchlines
import { copyFileSync, mkdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

const botDir = process.env.MAKEFUN_BOT_DIR ?? "/bot";
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const limit = 200;

const source = join(botDir, "entry.txt");
const target = join(outDir, "entry.txt");

mkdirSync(outDir, { recursive: true });
copyFileSync(source, target);

// A final newline is added by editors when saving; it isn't part of the punchline.
let text = readFileSync(target, "utf8");
if (text.endsWith("\n")) {
  text = text.slice(0, -1);
}

if (text.length === 0) {
  console.error("Error: entry.txt is empty.");
  process.exit(1);
}

if (text.length > limit) {
  console.error(`Error: entry is ${text.length} characters, over the ${limit} character limit.`);
  process.exit(1);
}

console.log(`Character count: ${text.length}`);
console.log(text);
