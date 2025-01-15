// @ts-check
import { defineConfig } from "astro/config";
import { imageService } from "@unpic/astro/service";

// https://astro.build/config
export default defineConfig( {
    image: {
        // experimentalLayout: 'responsive',
        service: imageService(),
    },
	experimental: {
		responsiveImages: true,
		svg: true,
	},
});
