// @ts-check
import { defineConfig } from "astro/config";

import sitemap from "@astrojs/sitemap";

import tailwind from "@astrojs/tailwind";

import partytown from "@astrojs/partytown";

import svelte from "@astrojs/svelte";

import robots from "astro-robots";

// https://astro.build/config
export default defineConfig({
	site: "https://photography.jesseslomowitz.com/",
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
		tailwind(),
		partytown({
			config: {
				forward: ["dataLayer.push"],
			},
		}),
		svelte(),
		robots(),
	],
});
