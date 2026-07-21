import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://khaisrc.github.io",
  integrations: [sitemap()],
});
