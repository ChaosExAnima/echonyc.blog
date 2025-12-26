import type { LocalImageService } from 'astro';
import sharpService, {
	type SharpImageServiceConfig,
} from 'astro/assets/services/sharp';
import sharp from 'sharp';
import { site } from 'astro:config/server';

type LocalImageTransform = {
	src: string;
	tint?: boolean;
	[key: string]: any;
};

type CustomServiceConfig = SharpImageServiceConfig & {
	tintMatrix?: sharp.Matrix3x3;
};

type CustomLocalImageService = Omit<
	LocalImageService<CustomServiceConfig>,
	'parseURL'
> & {
	parseURL: (
		url: URL,
		config: any,
	) => Promise<undefined | LocalImageTransform>;
};

const service: CustomLocalImageService = {
	...sharpService,

	async getURL(options, imageConfig) {
		const url = await sharpService.getURL(options, imageConfig);
		if (!options.tint) {
			return url;
		}

		const urlObj = new URL(url, site);
		urlObj.searchParams.append('tint', '1');
		return `${urlObj.pathname}${urlObj.search}`;
	},

	async parseURL(url, config) {
		const parent = await sharpService.parseURL(url, config);
		if (!parent) {
			return parent;
		}

		if (url.searchParams.get('tint') === '1') {
			parent.tint = true;
		}

		return parent;
	},

	async transform(inputBuffer, transform, imageConfig) {
		const result = await sharpService.transform(
			inputBuffer,
			transform,
			imageConfig,
		);

		let data = result.data;

		const { tintMatrix } = imageConfig.service.config;
		if (transform.tint && tintMatrix) {
			const tintedImage = await sharp(data)
				.recomb(tintMatrix)
				.toBuffer({ resolveWithObject: true });
			data = tintedImage.data;
		}

		return {
			...result,
			data,
		};
	},
};

export default service;
