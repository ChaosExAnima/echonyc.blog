export const ActivityStreamContext = 'https://www.w3.org/ns/activitystreams';

export interface ActivityStream {
	'@context': typeof ActivityStreamContext;
	id: string;
	type: string;
}

export function trimTrailingSlash(path: string | URL) {
	const url = path instanceof URL ? path.toString() : path;
	return url.replace(/\/$/, '');
}
