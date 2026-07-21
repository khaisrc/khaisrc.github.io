import { access, readdir, readFile } from "node:fs/promises";
import { dirname, extname, join, resolve } from "node:path";

const root = resolve(import.meta.dirname, "..", "dist");

async function collect(path) {
  const entries = await readdir(path, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const child = join(path, entry.name);
    if (entry.isDirectory()) files.push(...(await collect(child)));
    else if (entry.name.endsWith(".html")) files.push(child);
  }
  return files;
}

function destinationFor(href, source) {
  const [path] = href.split("#");
  if (!path) return source;
  const resolved = path.startsWith("/") ? resolve(root, `.${path}`) : resolve(dirname(source), path);
  if (path.endsWith("/")) return join(resolved, "index.html");
  if (!extname(resolved)) return join(resolved, "index.html");
  return resolved;
}

const failures = [];
const htmlFiles = await collect(root);
for (const file of htmlFiles) {
  const html = await readFile(file, "utf8");
  const links = [...html.matchAll(/href="([^"]+)"/g)].map((match) => match[1]);
  for (const href of links) {
    if (/^(?:https?:|data:|javascript:)/.test(href)) continue;
    const destination = destinationFor(href, file);
    try {
      await access(destination);
    } catch {
      failures.push(`${file.replace(`${root}/`, "")}: ${href}`);
    }
  }
}

if (failures.length > 0) {
  console.error("Internal link validation failed:");
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log(`Internal link validation passed (${htmlFiles.length} HTML files).`);
