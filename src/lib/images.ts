import type { ComponentProps } from 'astro/types';
import { Image } from 'astro:assets';
import { rgbaToThumbHash } from 'thumbhash';
import sharp from 'sharp';

const IMAGES_DIR = '/content/blog/images/';

const imagesAsMetadata = import.meta.glob('../content/blog/images/*', {
	import: 'default',
	eager: true,
});

const imagesAsBuffer = import.meta.glob<Uint8Array>(
	'../content/blog/images/*',
	{
		import: 'default',
		query: '?uint8array',
	},
);

// Create a map where each key is the `src` (Astro reference) and the value
// is the image buffer
const images = Object.keys(imagesAsMetadata).reduce(
	(acc, path) => ({
		...acc,
		// @ts-expect-error – 'Property 'src' does not exist on type'
		[imagesAsMetadata[path]?.src]: imagesAsBuffer[path],
	}),
	{} as Record<string, () => Promise<Buffer>>,
);

type Src = ComponentProps<typeof Image>['src'];

async function srcToMetadata(src: Src) {
	const metadata = await src;
	if (typeof metadata === 'string') {
		throw new Error('Src is just a string');
	} else if ('default' in metadata) {
		return metadata.default;
	}
	return metadata;
}

async function srcToPath(src: Src) {
	if (typeof src === 'string') {
		return src;
	}
	const metadata = await srcToMetadata(src);
	return metadata.src;
}

export async function getImageAsBuffer(src: Src): Promise<Buffer> {
	const path = await srcToPath(src);

	const image = images[path];

	if (typeof image == 'undefined') {
		const pathWithinImages =
			path.split(IMAGES_DIR)[path.split(IMAGES_DIR).length - 1];

		// Although this does work with nested directories (i.e. `/assets/images/**/*`),
		// the build performance is significantly slower (almost 100% slower)
		if (pathWithinImages.length > 1) {
			throw new Error(
				`\`/src${IMAGES_DIR}\` must be a flat directory: ${path}`,
			);
		}

		throw new Error(`Unable to find image: ${path}`);
	}

	const buffer = await image();

	return buffer;
}

export async function getThumbhash(src: ComponentProps<typeof Image>['src']) {
	let path = (await srcToPath(src)).replace('/@fs', '').replace(/\?.+/, '');
	if (import.meta.env.MODE === 'production') {
		path = `dist${path}`;
	}

	const resized = sharp(path).resize(100, 100, {
		fit: 'inside',
	});
	const { data, info } = await resized
		.ensureAlpha()
		.raw()
		.toBuffer({ resolveWithObject: true });
	const hash = rgbaToThumbHash(info.width, info.height, data);
	return Buffer.from(hash).toString('base64');
}
