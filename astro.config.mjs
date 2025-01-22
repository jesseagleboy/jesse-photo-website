// @ts-check
import { defineConfig } from "astro/config";

import sitemap from "@astrojs/sitemap";

import tailwind from "@astrojs/tailwind";

import partytown from "@astrojs/partytown";

import svelte from "@astrojs/svelte";

// https://astro.build/config
export default defineConfig({
    site: "https://jesse-photo-website.netlify.app/",
    image: {
        experimentalLayout: "responsive",
    },

    experimental: {
        responsiveImages: true,
        svg: true,
    },

    integrations: [sitemap(), tailwind(), partytown({
        config: {
            forward: ["dataLayer.push"],
        },
		}), svelte()],
});