// src/content/config.ts
import { defineCollection, z } from 'astro:content';

const blogCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    publishDate: z
      .string()
      .or(z.date())
      .transform((val) => new Date(val)),
    tags: z.array(z.string()).optional(),
  }),
});

const essaysCollection = defineCollection({
    type: 'content',
    schema: z.object({
      title: z.string(),
      description: z.string(),
      publishDate: z
        .string()
        .or(z.date())
        .transform((val) => new Date(val)),
      tags: z.array(z.string()).optional(),
    }),
});

const projectsCollection = defineCollection({
    type: 'content',
    schema: z.object({
      title: z.string(),
      description: z.string(),
      publishDate: z
        .string()
        .or(z.date())
        .transform((val) => new Date(val)),
      tags: z.array(z.string()).optional(),
    }),
});

export const collections = {
  'blog': blogCollection,
  'essays': essaysCollection,
  'projects': projectsCollection,
};
