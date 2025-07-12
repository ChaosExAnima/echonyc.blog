// @ts-check

import eslint from '@eslint/js';
import eslintConfigPrettier from 'eslint-config-prettier';
import eslintPluginAstro from 'eslint-plugin-astro';
import perfectionist from 'eslint-plugin-perfectionist';
import tseslint from 'typescript-eslint';

const eslintConfig = tseslint.config(
	eslint.configs.recommended,
	tseslint.configs.recommended,
	perfectionist.configs['recommended-natural'],
	eslintPluginAstro.configs['jsx-a11y-recommended'],
	eslintConfigPrettier,
	{
		rules: {
			'astro/jsx-a11y/media-has-caption': ['off'],
			'perfectionist/sort-imports': [
				'warn',
				{ newlinesBetween: true, type: 'natural' },
			],
		},
	},
	{
		files: ['*.mjs'],
	},
	{
		ignores: ['.astro/', 'dist/'],
	},
);

export default eslintConfig;
