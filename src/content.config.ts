import { glob } from 'astro/loaders';
import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
	// Load Markdown and MDX files in the `src/content/blog/` directory.
	loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
	// Type-check frontmatter using a schema
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			date: z.coerce.date(),
			coverImage: image().optional(),
			coverAlt: z.string().optional(),
			categories: z.array(z.string()).default([]).optional(),
		}),
});

export const collections = { blog };
