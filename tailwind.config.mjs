// @ts-check

import typography from '@tailwindcss/typography';
import defaultTheme from 'tailwindcss/defaultTheme';

/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	plugins: [typography],
	theme: {
		extend: {
			animation: {
				fade: 'fade 0.5s ease-in-out',
			},
			fontFamily: {
				serif: [
					'Source Serif 4 Variable',
					...defaultTheme.fontFamily.serif,
				],
			},
			keyframes: {
				fade: {
					'0%': { opacity: '0' },
					'100%': { opacity: '1' },
				},
			},
		},
	},
};
