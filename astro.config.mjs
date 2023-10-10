import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	site: "https://docs.ergaster.org",
	integrations: [
		starlight({
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
