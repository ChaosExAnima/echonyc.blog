import type { LocalImageProps } from 'astro:assets';
import sharp from 'sharp';
import { rgbaToThumbHash } from 'thumbhash';

type Src = LocalImageProps['src'] | string;

export async function getThumbhash(src: Src) {
	const path = await metadataToPath(src);

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

async function metadataToPath(metadata: Src) {
	let path = '';
	if (typeof metadata === 'string') {
		path = metadata;
	} else if ('then' in metadata) {
		metadata = (await metadata).default;
	} else {
		path = metadata.src;
	}

	path = path.replace('/@fs', '').replace(/\?.+/, '');
	if (import.meta.env.MODE === 'production') {
		path = `dist${path}`;
	}
	return path;
}
