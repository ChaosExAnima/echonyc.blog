/** @type {import("prettier").Config} */
export default {
	overrides: [
		{
			files: '*.astro',
			options: {
				parser: 'astro',
			},
		},
	],
	plugins: ['prettier-plugin-astro', 'prettier-plugin-tailwindcss'],
	singleQuote: true,
	tabWidth: 4,
	useTabs: true,
};
