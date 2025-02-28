import { defineCollection } from "astro:content";
import cloudinaryAPI from "cloudinary-setup";

function convertGPSToString(gpsString: string): string {
	//https://www.google.com/maps/embed/v1/place?q=28%C2%B025'6.7%22N%2081%C2%B034'52.0%22W&key=AIzaSyBtJwFFbdB9RZgA09oSq_jejVCNyXeQXYU
	// latitude: "28 deg 25' 7.55\" N" to `${degrees}°${minutes}'${seconds}"`
	const newString = gpsString.replace(
		/(\d+) deg (\d+)' ([0-9]+\.[0-9]+)" ([NSEW])/g,
		`$1º$2'$3"$4`,
	);
	return newString;
}

function getGoogleEmbedURL(finalGPSString: string) {
	const areaString = encodeURIComponent(finalGPSString);
	const src = `https://www.google.com/maps/embed/v1/place?q=${areaString}&key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}`;
	const photoDate = new Date().toDateString();

	return { src, photoDate };
}

export const collections = {
	"Disney Fireworks": defineCollection({
		loader: async () => {
			const testing = await cloudinaryAPI.api.resources_by_asset_folder(
				"Disney Fireworks",
				{
					max_results: 25,
				},
			);

			const photosWithMetadata = testing.resources.map(async (item) => {
                if (item.resource_type === "video") {
                    return {id: item.public_id, ...item}
                }
                const imageInformation = await cloudinaryAPI.api
					.resource(item.public_id, { media_metadata: true })
					.then((data) => {
						const metadata = data.media_metadata;
						const gpsString = `${convertGPSToString(metadata.GPSLatitude)} ${convertGPSToString(metadata.GPSLongitude)}`;
						const googleSrc = getGoogleEmbedURL(gpsString).src;
						const dataSetup = {
							date: metadata.DateTimeOriginal,
							offsetTimeOriginal: metadata.OffsetTimeOriginal,
							latitude: metadata.GPSLatitude,
							longitude: metadata.GPSLongitude,
							gpsString,
							googleSrc,
						};
						

						return { ...data, ...dataSetup, media_metadata: null };
					})
					.catch((err) => {
						console.log(err, "error");
						return { id: "error", public_id: '', height: 0, width: 0 };
					});
				return await { ...imageInformation, id: item.public_id };
			});

			const awaitedPhotosWithMetadata = await Promise.all(photosWithMetadata);

			return awaitedPhotosWithMetadata;
		},
	}),
};
