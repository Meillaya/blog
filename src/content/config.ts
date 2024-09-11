// src/content/config.ts
import { defineCollection, z } from 'astro:content';

const blogCollection = defineCollection({
  type: 'content', // v2.5.0 and later
  schema: z.object({
    title: z.string(),
    publishDate: z.date(),
    description: z.string(),
    // tags: z.array(z.string()),
    // image: z.string().optional(),
  }),
});

const progressReportsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    days: z.array(z.number()),
    description: z.string(),
    title: z.string(),
    publishDate: z.date(),
  })
});



export const collections = {
  'blog': blogCollection,
  'progress-reports': progressReportsCollection,
};
