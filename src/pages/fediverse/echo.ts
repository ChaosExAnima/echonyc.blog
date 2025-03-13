import type { APIRoute } from 'astro';

import { FEDI_USER, SITE_DESCRIPTION, SITE_TITLE, USERNAME } from '~/consts';
import { trimTrailingSlash } from '~/lib/urls';

interface Actor {
	'@context': 'https://www.w3.org/ns/activitystreams';
	attachments: ActorAttachment[];
	discoverable?: boolean;
	followers: string;
	following: string;
	icon: ActorMedia;
	id: string;
	image: ActorMedia;
	inbox: string;
	name: string;
	outbox: string;
	preferredUsername: string;
	publicKey: ActorKey;
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

const KEY = `-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAqSPPSwVnf88P6bdMKQoj
sGe9yEFfwFwx410ZbLojrSoQSDw6vuK7GvyRPJUr+OAFo6I7Z4DMmLKHWcwkY7gK
CJAZw9n04AHFZFfPEhBouXrIvKACpft3LpNOmHhp3PAjW58JxsKsRKq4iUf0KBV9
uR6XGu7ImHetnoa+KhYJmAfRY13vT3BTDltOtz2vCP4R6lgl+rgZ+GWIW+3iJpGP
VK3UalkB3eegviWscBMjMuSlPQ6xwoGMkgE5tc4CXDWFtMzb56p7u5rNEDUqZsot
yAStyRYnHvKfYGSAvTsQLr6SjA3g2bus7pE+wfGc2RtpU2BC2g6/f4NL1vEPA1nb
bwIDAQAB
-----END PUBLIC KEY-----`;

export const GET: APIRoute = ({ site }) => {
	const siteUrl = site ?? new URL('http://localhost:4321');
	const host = trimTrailingSlash(siteUrl);
	const avatar: ActorMedia = {
		mediaType: 'image/svg+xml',
		type: 'Image',
		url: `${host}/favicon.svg`,
	};
	const body: Actor = {
		'@context': 'https://www.w3.org/ns/activitystreams',
		attachments: [],
		discoverable: true,
		followers: `${FEDI_USER}/followers`,
		following: `${FEDI_USER}/following`,
		icon: avatar,
		id: `${host}/fediverse/${USERNAME}`,
		image: avatar,
		inbox: `${FEDI_USER}/inbox`,
		name: SITE_TITLE,
		outbox: '',
		preferredUsername: USERNAME,
		publicKey: {
			'@context': 'https://w3id.org/security/v1',
			'@type': 'Key',
			id: `${host}/fediverse/${USERNAME}#main-key`,
			owner: `${host}/fediverse/${USERNAME}`,
			publicKeyPem: KEY,
		},
		summary: SITE_DESCRIPTION,
		type: 'Person',
		url: host,
	};
	return new Response(JSON.stringify(body), {
		headers: { 'Content-Type': 'application/activity+json' },
	});
};
