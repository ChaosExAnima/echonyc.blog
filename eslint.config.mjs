import eslintConfigPrettier from 'eslint-config-prettier';
import eslintPluginAstro from 'eslint-plugin-astro';
import perfectionist from 'eslint-plugin-perfectionist';

const eslintConfig = [
	perfectionist.configs['recommended-alphabetical'],
	...eslintPluginAstro.configs['jsx-a11y-recommended'],
	eslintConfigPrettier,
	{
		ignores: ['.astro/'],
		rules: {
			'astro/jsx-a11y/media-has-caption': ['off'],
		},
	},
];

export default eslintConfig;
