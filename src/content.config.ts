import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const blog = defineCollection({
  loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      pubDate: z.coerce.date(),
      updatedDate: z.coerce.date().optional(),
      heroImage: z.optional(image()),
      tags: z.array(z.string()).default([]),
      category: z.string().default('General'),
      difficulty: z.enum(['Fácil', 'Intermedio', 'Avanzado']).default('Intermedio'),
      featured: z.boolean().default(false),
      views: z.number().default(120),
      author: z.object({
        name: z.string().default('César Adrián Morado'),
        avatar: z.string().default('https://api.dicebear.com/7.x/bottts/svg?seed=Cesar')
      }).default({
        name: 'César Adrián Morado',
        avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=Cesar'
      }),
      series: z.object({
        id: z.enum(['angular', 'react', 'vue', 'astro']),
        step: z.number(),
        title: z.string() // Name of the step inside the series
      }).optional()
    }),
});

export const collections = { blog };
