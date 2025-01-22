<script lang="ts">
	import { Image } from "astro:assets";
	import Layout from "@/layouts/Layout.astro";
	import type { ImageMetadata } from "astro";
	import { Masonry } from "astro-masonry";

	const listOfFireworks = import.meta.glob<{ default: ImageMetadata }>("/src/assets/fireworks-images/*.jpeg", { eager: true });
	const listing = Object.values(listOfFireworks);
</script>

<Layout>
	<Masonry
		sortByHeight={true}
		breakpointCols={{
			default: 4,
			1100: 3,
			700: 2,
			500: 1,
		}}
	>
		{listing.map(({ default: info }, index) => {
			return (
				<div id='image-container'>
					<button>See Image</button>
					<div id='index'>{index + 1}</div>
					<Image src={info} alt='Fireworks' />
				</div>
			);
		})}
	</Masonry>
	<dialog>
		<div id="dialog-content">
			<Image id="dialog-image" src={listing[0].default} alt="Fireworks" style={{ objectFit: "contain" }} />
			<button>Close</button>
		</div>
	</dialog>

	
</Layout>

<style lang="scss">
		:global(.astro-masonry-grid) {
			/* Your custom styles */
			/* You will need to add display: flex */
			gap: 0.5rem;
			padding: 3rem;
		}

		:global(.astro-masonry-grid_column) {
			/* Your custom column styles */
			display: flex;
			flex-direction: column;
			gap: 1rem;
			justify-content: space-between;
		}

		#image-container {
			position: relative;
			overflow: hidden;
			border-radius: 10px;
			border: 1px solid rgba(217, 215, 215, 0.844);

			img {
			}

			img:hover {
				transform: scale(1.1);
				transition: transform 0.5s;
			}
		}

		#index {
			position: absolute;
			top: 1%;
			left: 1%;
			background-color: rgba(0, 0, 0, 0.5);
			color: white;
			padding: 5px;
			border-radius: 5px;
			z-index: 2;
		}

		button {
			position: absolute;
			top: 1%;
			right: 1%;
			background-color: rgba(0, 0, 0, 0.5);
			color: white;
			padding: 5px;
			border-radius: 5px;
			z-index: 2;
		}

		body {
			background-color: black;
		}

		#dialog-content {
			width: 50dvw;
			height: 50dvh;
		}
		#dialog-image {
			width: 100%;
			height: 100%;
		}
	</style>
