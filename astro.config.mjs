/* global process */
// @ts-check

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import pageInsight from 'astro-page-insight';
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
	experimental: {
		responsiveImages: true,
	},
	integrations: [mdx(), sitemap(), pageInsight()],
	redirects: {
		'/my-pronouns': '/pronouns',
	},
	site:
		process.env.CF_PAGES_URL ??
		(process.env.NODE_ENV === 'development'
			? 'http://localhost:4321'
			: 'https://echonyc.blog'),
	vite: {
		plugins: [tailwindcss()],
	},
});
