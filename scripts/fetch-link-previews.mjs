import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";

const dataPath = resolve(import.meta.dirname, "../src/data/link-previews.json");

function decodeEntities(str) {
  return str
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&apos;/g, "'");
}

function attr(tagAttrs, name) {
  const m = tagAttrs.match(new RegExp(`(?:^|\\s)${name}=["']([^"']*)["']`, "i"));
  return m ? decodeEntities(m[1].trim()) : null;
}

function parseMeta(html, baseUrl) {
  const origin = new URL(baseUrl).origin;
  const og = {};

  for (const [, tagAttrs] of html.matchAll(/<meta\s([^>]+?)\s*\/?>/gi)) {
    const prop = attr(tagAttrs, "property") || attr(tagAttrs, "name");
    const content = attr(tagAttrs, "content");
    if (prop && content) og[prop.toLowerCase()] = content;
  }

  const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i);
  const title = og["og:title"] || (titleMatch ? decodeEntities(titleMatch[1].trim()) : null);
  const description = og["og:description"] || og["description"] || null;

  let image = og["og:image"] || og["twitter:image"] || null;
  if (image && image.startsWith("/")) image = origin + image;

  const hostname = new URL(baseUrl).hostname.replace(/^www\./, "");

  return {
    title: title || hostname,
    description: description || null,
    image: image || null,
    domain: hostname,
    favicon: `${origin}/favicon.ico`,
    fetchedAt: new Date().toISOString(),
  };
}

async function fetchPreview(url) {
  const res = await fetch(url, {
    headers: { "User-Agent": "Mozilla/5.0 (compatible; link-preview-fetcher/1.0)" },
    signal: AbortSignal.timeout(15000),
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);

  // Read only the first 50 KB — OG tags live in <head>
  const reader = res.body.getReader();
  const decoder = new TextDecoder();
  let html = "";
  while (html.length < 50000) {
    const { done, value } = await reader.read();
    if (done) break;
    html += decoder.decode(value, { stream: true });
  }
  reader.cancel().catch(() => {});

  return parseMeta(html, url);
}

const dataDir = dirname(dataPath);
if (!existsSync(dataDir)) mkdirSync(dataDir, { recursive: true });
const existing = existsSync(dataPath) ? JSON.parse(readFileSync(dataPath, "utf-8")) : {};

const urls = process.argv.slice(2).length > 0 ? process.argv.slice(2) : Object.keys(existing);

if (urls.length === 0) {
  console.log("No URLs. Pass URLs as arguments, or run with no args to refresh all.");
  process.exit(0);
}

for (const url of urls) {
  process.stdout.write(`Fetching ${url} ... `);
  try {
    existing[url] = await fetchPreview(url);
    console.log(`✓ ${existing[url].title}`);
  } catch (err) {
    console.log(`✗ ${err.message}`);
  }
}

writeFileSync(dataPath, JSON.stringify(existing, null, 2) + "\n");
console.log(`\nWrote ${Object.keys(existing).length} entries → src/data/link-previews.json`);
