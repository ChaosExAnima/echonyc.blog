import mdx from '@astrojs/mdx';
import partytown from '@astrojs/partytown';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';
// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
	integrations: [mdx(), sitemap(), react(), tailwind(), partytown()],
	redirects: {
		'/my-pronouns': '/blog/2019/01/my-pronouns',
		'/pronouns': '/blog/2019/01/my-pronouns',
	},
	site: 'https://example.com',
});
