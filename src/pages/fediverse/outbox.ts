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
	items: OutboxItem[];
	summary: string;
	totalItems: number;
	type: 'OrderedCollection';
}

interface OutboxItem extends ActivityStream {
	actor: string;
	object: OutboxNote;
	published: string;
	to: string[];
	type: 'Create';
}

interface OutboxNote extends ActivityStream {
	attributedTo: string;
	content: string;
	hash?: string;
	published: string;
	tags: Hashtag[];
	type: 'Note';
	url: string;
}

export const GET: APIRoute = async ({ site }) => {
	const siteUrl = site ?? new URL('http://localhost:4321');
	const host = trimTrailingSlash(siteUrl);

	const posts = await getCollection('blog');
	const body: Outbox = {
		'@context': ActivityStreamContext,
		id: `${host}/outbox`,
		items: posts.map((post) => ({
			'@context': ActivityStreamContext,
			actor: `${host}/fediverse/echo`,
			id: `${post.id}#create`,
			object: {
				'@context': ActivityStreamContext,
				attributedTo: `${host}/fediverse/echo`,
				content: post.rendered?.html ?? '',
				id: post.id,
				published: post.data.date.toISOString(),
				tags: (post.data.categories ?? []).map((tag) => ({
					href: `${host}/category/${tag}`,
					name: `#${tag}`,
					type: 'Hashtag',
				})),
				title: post.data.title,
				type: 'Note',
				url: post.id,
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
