import { readdir, readFile } from "node:fs/promises";
import { extname, join, relative, resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const mode = process.argv[2] ?? "--source";
const textExtensions = new Set([".astro", ".css", ".html", ".js", ".json", ".md", ".mjs", ".ts", ".typ", ".xml"]);
const sourceTargets = ["src", "resume-public.typ"];
const outputTargets = ["dist"];
const targets = mode === "--output" ? outputTargets : sourceTargets;

const forbidden = [
  { label: "email address", pattern: /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/i },
  { label: "mailto link", pattern: /mailto:/i },
  { label: "US phone number", pattern: /(?:\+?1[ .-]?)?\(?\d{3}\)?[ .-]\d{3}[ .-]\d{4}/ },
  { label: "local user path", pattern: /\/Users\// },
  { label: "internal ticket identifier", pattern: /\b(?:CRXS|RXS|PE)-\d+\b/ },
  { label: "unfinished placeholder", pattern: /\b(?:TBD|TODO)\b|___/ },
];

async function collect(path) {
  const statEntries = await readdir(path, { withFileTypes: true });
  const files = [];
  for (const entry of statEntries) {
    const child = join(path, entry.name);
    if (entry.isDirectory()) files.push(...(await collect(child)));
    else if (textExtensions.has(extname(entry.name))) files.push(child);
  }
  return files;
}

const files = [];
for (const target of targets) {
  const path = resolve(root, target);
  if (extname(path)) files.push(path);
  else files.push(...(await collect(path)));
}

const failures = [];
for (const file of files) {
  const contents = await readFile(file, "utf8");
  for (const rule of forbidden) {
    if (rule.pattern.test(contents)) {
      failures.push(`${relative(root, file)}: contains ${rule.label}`);
    }
  }
}

if (failures.length > 0) {
  console.error(`Content validation failed (${mode}):`);
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log(`Content validation passed (${mode}, ${files.length} text files).`);
