import adjustLayout from "../functions/adjustLayout";
export default function constructModalImage(
	dialog: HTMLDialogElement | null,
	iframe: HTMLIFrameElement | null | undefined,
	dateElement: HTMLDivElement | null | undefined,
	button: HTMLButtonElement,
) {
	button.addEventListener("click", () => {
		if (!dialog) return;
		const modalImage = dialog.querySelector("img");
		dialog.showModal();

		const src = button.getAttribute("data-GPSSrc");
		if (iframe) {
			iframe.src = src || "";
		}

		const getIndex = button.getAttribute("data-index") || "0";
		const index = Number.parseInt(getIndex, 10);
		const masonImage = document.getElementById(`mason-image-${index}`);

		const getDate = button.getAttribute("data-date") || "0";
		if (dateElement) {
			dateElement.textContent = getDate;
		}

		if (modalImage && masonImage) {
			const newNode = masonImage.cloneNode(true) as HTMLImageElement;

			newNode.style.height = "100%";

			newNode.id = "modal-image";
			newNode.classList.add("object-contain", "rounded-lg");
			// Since there is a cloning of all the attributes, we need to remove the hover effect
			newNode.classList.remove("hover:scale-110", "transition", "duration-500");

			newNode.addEventListener("load", (e) => adjustLayout(e, index));

			modalImage.parentNode?.replaceChild(newNode, modalImage);
		}
	});
}
