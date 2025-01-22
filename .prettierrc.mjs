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
	plugins: ['prettier-plugin-astro'],
	singleQuote: true,
	tabWidth: 4,
	useTabs: true,
};
