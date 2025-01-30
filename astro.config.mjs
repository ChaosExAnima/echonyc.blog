// @ts-check

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';
import pageInsight from 'astro-page-insight';
import pagefind from 'astro-pagefind';
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
	build: {
		format: 'file',
	},
	experimental: {
		responsiveImages: true,
	},
	integrations: [mdx(), sitemap(), tailwind(), pageInsight(), pagefind()],
	redirects: {
		'/my-pronouns': '/pronouns',
	},
	site: 'https://echonyc.blog',
});
