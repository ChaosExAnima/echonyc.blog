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
	image: {
		responsiveStyles: true,
		service: {
			config: {
				tintMatrix: [
					[0.35, 0.688, 0.167],
					[0.301, 0.59, 0.145],
					[0.392, 0.767, 0.188],
				],
			},
			entrypoint: './src/lib/image-service.ts',
		},
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
