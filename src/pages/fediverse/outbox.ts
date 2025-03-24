import type { APIRoute } from 'astro';

import { getCollection } from 'astro:content';

import { SITE_DESCRIPTION } from '~/consts';
import { getPostPath, type Post } from '~/lib/posts';
import {
	type ActivityStream,
	ActivityStreamContext,
	trimTrailingSlash,
} from '~/lib/urls';

interface Attachments {
	blurhash?: string;
	summary?: string;
	url: string;
}

interface Hashtag {
	href: string;
	name: string;
	type: string;
}

interface Outbox extends ActivityStream {
	orderedItems: OutboxItem[];
	summary: string;
	totalItems: number;
	type: 'OrderedCollection';
}

interface OutboxArticle extends ActivityStream {
	attachments: Attachments[];
	attributedTo: string;
	content: string;
	hash?: string;
	published: string;
	tag: Hashtag[];
	title: string;
	type: 'Article';
	url: string;
}

interface OutboxItem extends ActivityStream {
	actor: string;
	object: OutboxArticle;
	published: string;
	to: string[];
	type: 'Create';
}

export const GET: APIRoute = async ({ site }) => {
	const siteUrl = site ?? new URL('http://localhost:4321');
	const host = trimTrailingSlash(siteUrl);

	const posts = await getCollection('blog');
	const body: Outbox = {
		'@context': ActivityStreamContext,
		id: `${host}/outbox`,
		orderedItems: posts
			.toSorted((a, b) => b.data.date.getTime() - a.data.date.getTime())
			.map((post) => postToArticle(post, host)),
		summary: SITE_DESCRIPTION,
		totalItems: posts.length,
		type: 'OrderedCollection',
	};
	return new Response(JSON.stringify(body), {
		headers: { 'Content-Type': 'application/activity+json' },
	});
};

function postToArticle(post: Post, host: string): OutboxItem {
	const permalink = `${host}${getPostPath(post)}`;
	return {
		'@context': ActivityStreamContext,
		actor: `${host}/fediverse/echo`,
		id: `${permalink}#create`,
		object: {
			'@context': ActivityStreamContext,
			attachments: post.data.coverImage
				? [
						{
							summary: post.data.coverAlt,
							url: post.data.coverImage.src,
						},
					]
				: [],
			attributedTo: `${host}/fediverse/echo`,
			content: post.rendered?.html ?? '',
			id: permalink,
			published: post.data.date.toISOString(),
			tag: (post.data.categories ?? []).map((tag) => ({
				href: `${host}/category/${tag.toLowerCase().replaceAll(/[^a-z]+/g, '-')}`,
				name: `#${tag}`,
				type: 'Hashtag',
			})),
			title: post.data.title,
			type: 'Article',
			url: permalink,
		},
		published: post.data.date.toISOString(),
		to: [`${ActivityStreamContext}#Public`],
		type: 'Create',
	};
}
