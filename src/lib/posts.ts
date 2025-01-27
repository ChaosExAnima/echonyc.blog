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
