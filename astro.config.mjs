// @ts-check
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import partytown from "@astrojs/partytown";
import svelte from "@astrojs/svelte";
import robots from "astro-robots";
import tailwindcss from "@tailwindcss/vite";
import webmanifest from "astro-webmanifest";

// https://astro.build/config
export default defineConfig({
	site: "https://photography.jesseslomowitz.com",
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
		webmanifest({
			name: "Disney Fireworks by Jesse Slomowitz",
			short_name: "Disney Fireworks",
			icon: "src/assets/jslogo-manifest.svg",
			description: "A collection of Disney fireworks shows.",
			start_url: "/",
			theme_color: "#3367D6",
			background_color: "#3367D6",
			display: "standalone",
		}),
	],

	vite: {
		plugins: [tailwindcss()],
	},
});
