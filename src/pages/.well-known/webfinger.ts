import type { APIRoute } from 'astro';

import { USERNAME } from '~/lib/constants';
import { trimTrailingSlash } from '~/lib/urls';

interface Webfinger {
	aliases: string[];
	links: WebfingerLink[];
	subject: string;
}

interface WebfingerLink {
	href: string;
	rel: string;
	type: string;
}

export const GET: APIRoute = ({ site }) => {
	const siteUrl = site ?? new URL('http://localhost:4321');
	const host = trimTrailingSlash(siteUrl);
	const body: Webfinger = {
		aliases: [`${host}/@${USERNAME}`],
		links: [
			{
				href: `${host}/fediverse/${USERNAME}`,
				rel: 'self',
				type: 'application/activity+json',
			},
			{
				href: host,
				rel: 'http://webfinger.net/rel/profile-page',
				type: 'text/html',
			},
			{
				href: `${host}/favicon.svg`,
				rel: 'http://webfinger.net/rel/avatar',
				type: 'image/svg+xml',
			},
		],
		subject: `acct:${USERNAME}@${siteUrl.hostname}`,
	} as const;
	return new Response(JSON.stringify(body), {
		headers: {
			'Content-Type': 'application/activity+json',
		},
	});
};
