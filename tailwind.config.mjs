import typography from '@tailwindcss/typography';
import defaultTheme from 'tailwindcss/defaultTheme';

/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	plugins: [typography],
	theme: {
		extend: {
			fontFamily: {
				serif: [
					'Source Serif 4 Variable',
					...defaultTheme.fontFamily.serif,
				],
			},
		},
	},
};
