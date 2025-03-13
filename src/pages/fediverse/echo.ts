import type { APIRoute } from 'astro';

import fs from 'node:fs/promises';
import path from 'node:path';

import { FEDI_USER, SITE_DESCRIPTION, SITE_TITLE, USERNAME } from '~/consts';
import {
	type ActivityStream,
	ActivityStreamContext,
	trimTrailingSlash,
} from '~/lib/urls';

interface Actor extends ActivityStream {
	attachment: ActorAttachment[];
	discoverable?: boolean;
	followers: string;
	following: string;
	icon: ActorMedia;
	image: ActorMedia;
	inbox: string;
	name: string;
	outbox: string;
	preferredUsername: string;
	publicKey: ActorKey;
	published: string;
	summary: string;
	type: 'Person';
	url: string;
}

interface ActorAttachment {
	name: string;
	type: string;
	value: string;
}

interface ActorKey {
	'@context': 'https://w3id.org/security/v1';
	'@type': 'Key';
	id: string;
	owner: string;
	publicKeyPem: string;
}

interface ActorMedia {
	mediaType: string;
	type: 'Image';
	url: string;
}

function formatAttachment(name: string, url: string): ActorAttachment {
	return {
		name,
		type: 'PropertyValue',
		value: `<a href="${url}" target="_blank" rel="nofollow noopener noreferrer me" translate="no"><span class="invisible">https://</span><span>maho.dev</span></a>`,
	};
}

export const GET: APIRoute = async ({ site }) => {
	const siteUrl = site ?? new URL('http://localhost:4321');
	const host = trimTrailingSlash(siteUrl);
	const avatar: ActorMedia = {
		mediaType: 'image/jpg',
		type: 'Image',
		url: `${host}/favicon.jpg`,
	};

	const key = await fs.readFile(
		path.resolve('src/pages/fediverse', '_public.pem'),
		'utf-8',
	);

	const body: Actor = {
		'@context': ActivityStreamContext,
		attachment: [
			formatAttachment('Blog', host),
			formatAttachment('GitHub', 'https://github.com/ChaosExAnima'),
			formatAttachment('Mastodon', FEDI_USER),
		],
		discoverable: true,
		followers: `${FEDI_USER}/followers`,
		following: `${FEDI_USER}/following`,
		icon: avatar,
		id: `${host}/fediverse/${USERNAME}`,
		image: avatar,
		inbox: `${FEDI_USER}/inbox`,
		name: SITE_TITLE,
		outbox: `${host}/fediverse/outbox`,
		preferredUsername: USERNAME,
		publicKey: {
			'@context': 'https://w3id.org/security/v1',
			'@type': 'Key',
			id: `${host}/fediverse/${USERNAME}#main-key`,
			owner: `${host}/fediverse/${USERNAME}`,
			publicKeyPem: key,
		},
		published: new Date(2020, 0, 1).toISOString(),
		summary: SITE_DESCRIPTION,
		type: 'Person',
		url: host,
	};
	return new Response(JSON.stringify(body), {
		headers: { 'Content-Type': 'application/activity+json' },
	});
};
