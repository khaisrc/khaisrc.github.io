import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const projects = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/projects" }),
  schema: z.object({
    title: z.string().min(1),
    summary: z.string().min(1),
    url: z.url().optional(),
    launchDate: z.coerce.date().optional(),
    status: z.enum(["upcoming", "active", "archived"]).default("active"),
    tags: z.array(z.string().min(1)).default([]),
    order: z.number().int().positive(),
    draft: z.boolean().default(false),
  }),
});

const caseStudies = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/case-studies" }),
  schema: z.object({
    title: z.string().min(1),
    company: z.string().min(1),
    companyUrl: z.url().optional(),
    role: z.string().min(1),
    period: z.string().optional(),
    summary: z.string().min(1),
    description: z.string().min(1),
    techStack: z.array(z.string().min(1)).min(1),
    metrics: z.array(
      z.object({
        value: z.string().min(1),
        label: z.string().min(1),
        context: z.string().optional(),
      }),
    ),
    areas: z.array(z.string().min(1)).min(1),
    diagram: z.object({
      title: z.string().min(1),
      description: z.string().min(1),
      src: z.string().min(1),
    }).optional(),
    featured: z.boolean().default(false),
    order: z.number().int().positive(),
    confidentialityReviewed: z.literal(true),
    draft: z.boolean().default(false),
  }),
});

const blog = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/blog" }),
  schema: z.object({
    title: z.string().min(1),
    date: z.coerce.date(),
    summary: z.string().min(1),
    tags: z.array(z.string().min(1)).default([]),
    draft: z.boolean().default(false),
  }),
});

export const collections = { caseStudies, projects, blog };
