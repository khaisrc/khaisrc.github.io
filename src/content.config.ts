import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

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
    featured: z.boolean().default(false),
    order: z.number().int().positive(),
    confidentialityReviewed: z.literal(true),
    draft: z.boolean().default(false),
  }),
});

export const collections = { projects: caseStudies };
