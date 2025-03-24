/* global process */
// @ts-check

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import pageInsight from 'astro-page-insight';
import { defineConfig } from 'astro/config';

function getSite() {
	const { CF_PAGES_BRANCH, CF_PAGES_URL, NODE_ENV } = process.env;
	if (NODE_ENV === 'development') {
		return 'http://localhost:4321';
	}
	if (CF_PAGES_URL && CF_PAGES_BRANCH !== 'main') {
		return CF_PAGES_URL;
	}
	return 'https://echonyc.blog';
}

// https://astro.build/config
export default defineConfig({
	build: {
		format: 'file',
	},
	experimental: {
		responsiveImages: true,
	},
	integrations: [mdx(), sitemap(), pageInsight()],
	redirects: {
		'/my-pronouns': '/pronouns',
	},
	site: getSite(),
	vite: {
		plugins: [tailwindcss()],
	},
});
