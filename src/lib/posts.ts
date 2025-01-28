import crypto from 'node:crypto';

import { getCollection, type CollectionEntry } from 'astro:content';

export type Post = CollectionEntry<'blog'>;

export function getPostParams(post: Post) {
	const { date } = post.data;

	const year = String(date.getFullYear()).padStart(4, '0');
	const month = String(date.getMonth() + 1).padStart(2, '0');

	return {
		year,
		month,
		slug: post.id,
	};
}

export function getPostPath(post: Post) {
	const { year, month, slug } = getPostParams(post);
	return `/blog/${year}/${month}/${slug}`;
}

export async function getPosts() {
	return (await getCollection('blog')).sort(
		(a, b) => b.data.date.valueOf() - a.data.date.valueOf(),
	);
}

export async function hashFromTitle(post: Post) {
	const { title } = post.data;
	const hash = crypto.createHash('md5');
	hash.update(title);
	const hex = hash.digest().toString('hex');

	const intValue = parseInt(hex.slice(0, 3), 16);
	const hue = intValue % 360;

	return `${hue}-${hex.slice(3, 6)}`;
}
