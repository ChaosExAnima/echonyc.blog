// @ts-check

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';
import pageInsight from 'astro-page-insight';
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
	experimental: {
		responsiveImages: true,
	},
	integrations: [mdx(), sitemap(), tailwind(), pageInsight()],
	redirects: {
		'/my-pronouns': '/pronouns',
	},
	site: 'https://echonyc.blog',
});
