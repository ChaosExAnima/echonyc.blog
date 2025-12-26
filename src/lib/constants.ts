export const SITE_TITLE = 'Echo from NYC';
export const SITE_DESCRIPTION = 'Musing into the void';
export const USERNAME = 'echo';
export const FEDI_USER = 'https://ishella.gay/@echo';

export const themeColor = 'hsl(256.16, 100%, 76.89%)'; // Violet 400

export interface SocialLink {
	name: string;
	text?: string;
	url: string;
}

export const SOCIAL_LINKS: SocialLink[] = [
	{ name: 'Mastodon', text: '@echo@ishella.gay', url: FEDI_USER },
	{
		name: 'GitHub',
		text: 'ChaosExAnima',
		url: 'https://github.com/ChaosExAnima',
	},
	{
		name: 'Tumblr',
		url: 'https://echo.tumblr.com',
	},
];
