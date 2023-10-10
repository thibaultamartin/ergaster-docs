import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	site: "https://docs.ergaster.org",
	integrations: [
		starlight({
			head: [{
				tag: "script",
				attrs: {
					src: "https://analytics.eu.umami.is/script.js",
					"data-website-id": "7ace66fe-d496-4395-9b66-8819cbb9bbe3",
					async: true,
				},
			}],
			title: 'Ergaster Docs',
			logo: {
				light: './src/assets/logo.svg',
				dark: './src/assets/logo-dark.svg'
			},
			favicon: './src/assets/logo.svg',
			social: {
				github: 'https://github.com/thibaultamartin',
				mastodon: 'https://mamot.fr/@thibaultamartin',
			},
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
