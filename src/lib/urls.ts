export function trimTrailingSlash(path: string | URL) {
	const url = path instanceof URL ? path.toString() : path;
	return url.replace(/\/$/, '');
}
