import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	site: "https://docs.ergaster.org",
	integrations: [
		starlight({
			head: [
				import.meta.env.PROD && {
					tag: "script",
					attrs: {
						src: "https://analytics.eu.umami.is/script.js",
						"data-website-id": "7ace66fe-d496-4395-9b66-8819cbb9bbe3",
						async: true,
					},
				}
			].filter(Boolean),
			title: 'Ergaster Docs',
			logo: {
				light: './src/assets/logo.svg',
				dark: './src/assets/logo-dark.svg'
			},
			favicon: './src/assets/logo.svg',
			social: [
				{ icon: 'github', label: 'GitHub', href: 'https://github.com/thibaultamartin' },
				{ icon: 'mastodon', label: 'Mastodon', href: 'https://mamot.fr/@thibaultamartin' },
				{ icon: 'linkedin', label: 'LinkedIn', href: 'https://www.linkedin.com/in/ergaster/' },
				{ icon: 'blueSky', label: 'Bluesky', href: 'https://bsky.app/profile/thib.ergaster.org' }
			],
			editLink: {
				baseUrl: "https://github.com/thibaultamartin/ergaster-docs/edit/main/",
			},
			lastUpdated: true,
			sidebar: [
				{
					label: 'Overview',
					autogenerate: { directory: 'overview' },
				},
				{
					label: 'Deployment',
					autogenerate: { directory: 'deployment' },
				},
				{
					label: 'Learning the concepts',
					autogenerate: { directory: 'learning' },
				},
			],
		}),
	],
});
