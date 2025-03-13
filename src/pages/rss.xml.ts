import type { APIContext } from 'astro';

import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

import { SITE_DESCRIPTION, SITE_TITLE } from '~/consts';
import { getPostPath } from '~/lib/posts';

export async function GET(context: APIContext) {
	const posts = await getCollection('blog');
	return rss({
		description: SITE_DESCRIPTION,
		items: posts.map((post) => ({
			...post.data,
			link: getPostPath(post),
		})),
		site: context.site ?? '',
		title: SITE_TITLE,
	});
}
