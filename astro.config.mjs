// @ts-check
import { defineConfig } from "astro/config";

import sitemap from "@astrojs/sitemap";

import partytown from "@astrojs/partytown";

import svelte from "@astrojs/svelte";

import robots from "astro-robots";

import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
	site: "https://www.photography.jesseslomowitz.com",
	server: {
		open: true,
	},

	image: {
		experimentalLayout: "responsive",
	},

	experimental: {
		responsiveImages: true,
		svg: true,
	},

	integrations: [
		sitemap(),
		partytown({
			config: {
				forward: ["dataLayer.push"],
			},
		}),
		svelte(),
		robots(),
	],

	vite: {
		plugins: [tailwindcss()],
		assetsInclude: ["**/*.MOV", "**/*.mov"],
	},
});
