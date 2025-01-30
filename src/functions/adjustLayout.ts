/**
 * Adjusts the layout of the image container based on the image orientation.
 * @param img - The image element.
 * @param index - The index of the image.
 * @returns A function that adjusts the layout of the image container based on the image orientation.
 */
export default function adjustLayout(img: Event, index: number) {
	const target = img.target as HTMLImageElement;
	const container = document.getElementById("image-with-map");
	if (!container) return;

	const isPortrait = target.naturalHeight > target.naturalWidth;

	if (isPortrait) {
		container.classList.add("flex", "flex-row");
		container.classList.remove("grid", "grid-cols-1");
	} else {
		container.classList.add("grid", "grid-cols-1");
		container.classList.remove("flex", "flex-row");
	}
}
