import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://khaisrc.github.io",
  integrations: [mdx(), sitemap()],
  server: { port: 4823 },
});
