// One Line to Your Younger Self
// Writes a single line — the line its writer would send back to their
// younger self if one line were all they got — to /output/entry.txt.
// Deterministic: the same bytes on every run. Stdlib only, no network.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY =
  "Your father's handwriting looks exactly like yours now.";

// Gate guard: the entry must be UTF-8 text of 1 to 200 characters, not
// only whitespace, and a single line. Fail loudly instead of writing
// an entry the sealed scorer would reject.
const entryChars = [...ENTRY];
if (entryChars.length < 1 || entryChars.length > 200) {
  throw new Error(
    `entry length ${entryChars.length} characters is outside the 1-200 gate`,
  );
}
if (ENTRY.trim().length === 0) {
  throw new Error("entry is only whitespace");
}
if (ENTRY.includes("\n") || ENTRY.includes("\r")) {
  throw new Error("entry must be a single line");
}

const OUTPUT_DIR = "/output";
const OUTPUT_FILE = join(OUTPUT_DIR, "entry.txt");

mkdirSync(OUTPUT_DIR, { recursive: true });
writeFileSync(OUTPUT_FILE, ENTRY, "utf8");
