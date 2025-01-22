import type { CollectionEntry } from 'astro:content';

export function getPostParams(post: CollectionEntry<'blog'>) {
	const { pubDate } = post.data;

	const year = String(pubDate.getFullYear()).padStart(4, '0');
	const month = String(pubDate.getMonth() + 1).padStart(2, '0');

	return {
		year,
		month,
		slug: post.id,
	};
}

export function getPostPath(post: CollectionEntry<'blog'>) {
	const { year, month, slug } = getPostParams(post);
	return `blog/${year}/${month}/${slug}`;
}
