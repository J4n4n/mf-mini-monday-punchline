// Entry for make.fun's "Monday Morning Punchlines" bounty (Node 22, standard library only):
// it copies entry.txt from the repository root to /output/entry.txt, where
// the gate reads it. That is all the program has to do. The entry is the
// text itself: one word / one line, judged pairwise by an AI judge.
//
// Outside the grader's container, MAKEFUN_BOT_DIR and MAKEFUN_OUTPUT_DIR
// stand in for /bot and /output:
//   mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, mkdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const BOT_DIR = process.env.MAKEFUN_BOT_DIR ?? '/bot';
const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
const MAX_CHARS = 200;

mkdirSync(OUTPUT_DIR, { recursive: true });
try {
  copyFileSync(join(BOT_DIR, 'entry.txt'), join(OUTPUT_DIR, 'entry.txt'));
} catch (err) {
  console.error(`entry.txt could not be copied from ${BOT_DIR}: ${(err as Error).message}`);
  process.exit(1);
}

// Validate what was copied: the gate reads /output/entry.txt, so a bad file
// should fail here with a clear message instead of failing silently.
const copied = readFileSync(join(OUTPUT_DIR, 'entry.txt'), 'utf8');
const text = copied.replace(/\r?\n$/, '');
if (text.length === 0 || text.length > MAX_CHARS) {
  console.error(`entry.txt must hold 1-${MAX_CHARS} characters, got ${text.length}.`);
  process.exit(1);
}
console.log(`Entry (${text.length} chars): ${text}`);
