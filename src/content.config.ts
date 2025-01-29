import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
	// Load Markdown and MDX files in the `src/content/blog/` directory.
	loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
	// Type-check frontmatter using a schema
	schema: ({ image }) =>
		z.object({
			categories: z.array(z.string()).default([]).optional(),
			coverAlt: z.string().optional(),
			coverImage: image().optional(),
			date: z.coerce.date(),
			title: z.string(),
		}),
});

export const collections = { blog };
