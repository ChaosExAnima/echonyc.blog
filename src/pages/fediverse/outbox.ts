import type { APIRoute } from 'astro';

import { getCollection } from 'astro:content';

import { SITE_DESCRIPTION } from '~/consts';
import {
	type ActivityStream,
	ActivityStreamContext,
	trimTrailingSlash,
} from '~/lib/urls';

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
	attributedTo: string;
	content: string;
	hash?: string;
	published: string;
	tags: Hashtag[];
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
		orderedItems: posts.map((post) => ({
			'@context': ActivityStreamContext,
			actor: `${host}/fediverse/echo`,
			id: `${host}/blog/${post.id}#create`,
			object: {
				'@context': ActivityStreamContext,
				attributedTo: `${host}/fediverse/echo`,
				content: post.rendered?.html ?? '',
				id: `${host}/blog/${post.id}`,
				published: post.data.date.toISOString(),
				tags: (post.data.categories ?? []).map((tag) => ({
					href: `${host}/category/${tag}`,
					name: `#${tag}`,
					type: 'Hashtag',
				})),
				title: post.data.title,
				type: 'Article',
				url: `${host}/blog/${post.id}`,
			},
			published: post.data.date.toISOString(),
			to: ['https://www.w3.org/ns/activitystreams#Public'],
			type: 'Create',
		})),
		summary: SITE_DESCRIPTION,
		totalItems: posts.length,
		type: 'OrderedCollection',
	};
	return new Response(JSON.stringify(body), {
		headers: { 'Content-Type': 'application/activity+json' },
	});
};
