export const SITE_TITLE = 'Echo from NYC';
export const SITE_DESCRIPTION = 'Musing into the void';
export const USERNAME = 'echo';
export const FEDI_USER = 'https://tech.lgbt/users/chaosexanima';

export interface SocialLink {
	name: string;
	url: string;
}

export const SOCIAL_LINKS: SocialLink[] = [
	{ name: 'Mastodon', url: FEDI_USER },
	{
		name: 'GitHub',
		url: 'https://github.com/ChaosExAnima',
	},
	{
		name: 'Tumblr',
		url: 'https://echo.tumblr.com',
	},
	{
		name: 'Bluesky',
		url: 'https://bsky.app/profile/echo.ishella.gay',
	},
];
