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
					items: [
						{
							label: "Secure connection with SSH",
							link: "/learning/secure-connection-with-ssh",
						},
						{
							label: "Containers",
							link: "/learning/containers",
							badge: {
								text: "WIP",
								variant: "caution",
							},
						},
						{
							label: "Certs and reverse proxies",
							link: "/learning/certificates-and-reverse-proxies",
							badge: {
								text: "WIP",
								variant: "caution",
							},
						},
						{
							label: "Traefik routing magic",
							link: "/learning/traefik-routing",
							badge: {
								text: "WIP",
								variant: "caution",
							},
						},
						{
							label: "firewalld",
							link: "/learning/firewalld",
							badge: {
								text: "WIP",
								variant: "caution",
							},
						},
						{
							label: "systemd",
							link: "/learning/systemd",
							badge: {
								text: "WIP",
								variant: "caution",
							},
						},
						{
							label: "Ansible",
							link: "/learning/ansible",
							badge: {
								text: "WIP",
								variant: "caution",
							},
						},
						{
							label: "Wireguard",
							link: "/learning/wireguard",
							badge: {
								text: "WIP",
								variant: "caution",
							},
						},
						{
							label: "Monitoring and alerting",
							link: "/learning/monitoring-and-alerting",
							badge: {
								text: "WIP",
								variant: "caution",
							},
						},
						{
							label: "Disaster Recovery",
							link: "/learning/disaster-recovery",
							badge: {
								text: "WIP",
								variant: "caution",
							},
						},
						{
							label: "Logical volumes snapshots",
							link: "/learning/logical-volumes-snapshots",
							badge: {
								text: "WIP",
								variant: "caution",
							},
						},
					],
				},
			],
		}),
	],
});
