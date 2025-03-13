/* global process */
// @ts-check

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import pageInsight from 'astro-page-insight';
import { defineConfig } from 'astro/config';
import { loadEnv } from 'vite';

const { CF_PAGES_URL, NODE_ENV } = loadEnv(
	process.env.NODE_ENV ?? 'development',
	process.cwd(),
);

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
		CF_PAGES_URL ??
		(NODE_ENV === 'development'
			? 'http://localhost:4321'
			: 'https://echonyc.blog'),
	vite: {
		plugins: [tailwindcss()],
	},
});
