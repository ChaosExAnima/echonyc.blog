import mdx from '@astrojs/mdx';
import partytown from '@astrojs/partytown';
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
	integrations: [mdx(), sitemap(), tailwind(), partytown()],
	redirects: {
		'/my-pronouns': '/pronouns',
	},
	site: 'https://chaosexanima.github.io',
});
