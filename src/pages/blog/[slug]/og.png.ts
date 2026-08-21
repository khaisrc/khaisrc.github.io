import type { APIRoute } from "astro";
import { getCollection, type CollectionEntry } from "astro:content";
import satori from "satori";
import { Resvg } from "@resvg/resvg-js";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

export async function getStaticPaths() {
  const posts = await getCollection("blog", ({ data }) => !data.draft);
  return posts.map((post) => ({
    params: { slug: post.id },
    props: { post },
  }));
}

export const GET: APIRoute = async ({ props }) => {
  const post = props.post as CollectionEntry<"blog">;
  const { title, tags } = post.data;

  const fontData = readFileSync(resolve("public/fonts/ibm-plex-sans-medium.ttf"));

  const svg = await satori(
    {
      type: "div",
      props: {
        style: {
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#111111",
          padding: "72px 80px",
          fontFamily: "IBM Plex Sans",
        },
        children: [
          {
            type: "div",
            props: {
              style: { display: "flex", alignItems: "center", gap: "12px" },
              children: [
                {
                  type: "div",
                  props: {
                    style: {
                      width: "36px",
                      height: "36px",
                      borderRadius: "50%",
                      background: "#eeeeee",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "17px",
                      fontWeight: 500,
                      color: "#111111",
                    },
                    children: "K",
                  },
                },
                {
                  type: "span",
                  props: {
                    style: { color: "#b4b4b4", fontSize: "20px" },
                    children: "Khai | SWE",
                  },
                },
              ],
            },
          },
          {
            type: "div",
            props: {
              style: { display: "flex", flexDirection: "column", gap: "28px" },
              children: [
                {
                  type: "div",
                  props: {
                    style: {
                      fontSize: title.length > 55 ? "48px" : "60px",
                      fontWeight: 500,
                      color: "#eeeeee",
                      lineHeight: 1.1,
                      letterSpacing: "-0.02em",
                    },
                    children: title,
                  },
                },
                tags.length > 0
                  ? {
                      type: "div",
                      props: {
                        style: { display: "flex", gap: "10px" },
                        children: tags.slice(0, 5).map((tag) => ({
                          type: "span",
                          props: {
                            style: {
                              padding: "5px 14px",
                              border: "1px solid #3a3a3a",
                              borderRadius: "4px",
                              color: "#606060",
                              fontSize: "16px",
                            },
                            children: tag,
                          },
                        })),
                      },
                    }
                  : { type: "span", props: { children: "" } },
              ],
            },
          },
        ],
      },
    },
    {
      width: 1200,
      height: 630,
      fonts: [{ name: "IBM Plex Sans", data: fontData, weight: 500, style: "normal" }],
    },
  );

  const pngData = new Resvg(svg).render().asPng();

  return new Response(pngData.buffer as ArrayBuffer, {
    headers: {
      "Content-Type": "image/png",
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
};
