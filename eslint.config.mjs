// @ts-check

import eslint from '@eslint/js';
import eslintConfigPrettier from 'eslint-config-prettier';
import eslintPluginAstro from 'eslint-plugin-astro';
import perfectionist from 'eslint-plugin-perfectionist';
import { defineConfig } from 'eslint/config';

const eslintConfig = defineConfig(
	eslint.configs.recommended,
	perfectionist.configs['recommended-alphabetical'],
	...eslintPluginAstro.configs['jsx-a11y-recommended'],
	eslintConfigPrettier,
	{
		rules: {
			'astro/jsx-a11y/media-has-caption': ['off'],
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
