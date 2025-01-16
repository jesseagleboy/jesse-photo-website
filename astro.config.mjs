// @ts-check
import { defineConfig } from "astro/config";
import { imageService } from "@unpic/astro/service";

import sitemap from "@astrojs/sitemap";

import tailwind from "@astrojs/tailwind";

import partytown from "@astrojs/partytown";

// https://astro.build/config
export default defineConfig( {
  site: 'https://jesse-photo-website.netlify.app/',
	image: {
		// experimentalLayout: 'responsive',
    service: imageService( {
      placeholder: 'blurhash',
    }),
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
	],
});
