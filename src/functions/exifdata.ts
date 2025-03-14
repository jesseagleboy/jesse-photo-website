import { getImage } from "astro:assets";
import ExifReader, { type TypedTag, type XmpTag } from "exifreader";
import { DateTime } from "luxon";
import bareMetadataSetup from "./bareMetadataSetup"

export interface DataTypes {
	metadata: ExifReader.Tags;
	image_data: ImageMetadata;
	googleMapsSrc: string;
	date: string;
	imageElementInput: Awaited<ReturnType<typeof getImage>> | null;
}




interface GPSStringReturnType {
	gpsToString: string;
	gpsData: {
		latitude: string;
		longitude: string;
	};
}
export async function setupExifData([path, image]: [
	string,
	{ default: ImageMetadata },
]): Promise<DataTypes> {
	const isVideo = path.endsWith(".MOV");
	if (isVideo) {
		return {
			metadata: {} as ExifReader.Tags,
			image_data: image.default,
			googleMapsSrc: "",
			date: "",
			imageElementInput: null,
		};
	}
	const astroMediaData = await getImage({ src: image.default });
	const newPath = path.slice(1);
	console.log(newPath, "new path");
	const metadata = await ExifReader.load(newPath);
	const information = bareMetadataSetup({
		gpsData: metadata,
		metadata,
	});

	return {
		metadata,
		image_data: image.default,
		googleMapsSrc: information.src,
		date: information.photoDate.formattedDate,
		imageElementInput: astroMediaData,
	};
}

type GPSShape =
	| ExifReader.Tags["GPSLatitude"]
	| ExifReader.Tags["GPSLongitude"];
function convertToDMS(coordinates: GPSShape): string {
	if (!coordinates || !Array.isArray(coordinates.value)) {
		return "";
	}
	if (Object.hasOwn(coordinates.value[0], "attributes")) {
		return "";
	}
	const value = coordinates.value as [number, number][];
	const degrees = value[0][0];
	const minutes = value[1][0];
	const seconds = (value[2][0] / value[2][1]).toFixed(1);
	return `${degrees}°${minutes}'${seconds}"`;
}

function convertGPSToString(gpsData: ExifReader.Tags): GPSStringReturnType {
	const lat = convertToDMS(gpsData.GPSLatitude);
	const lng = convertToDMS(gpsData.GPSLongitude);
	const latDir =
		gpsData.GPSLatitudeRef && Array.isArray(gpsData.GPSLatitudeRef.value)
			? gpsData.GPSLatitudeRef.value[0]
			: "";
	const lngDir =
		gpsData.GPSLongitudeRef && Array.isArray(gpsData.GPSLongitudeRef.value)
			? gpsData.GPSLongitudeRef.value[0]
			: "";

	return {
		gpsToString: `${lat}${latDir} ${lng}${lngDir}`,
		gpsData: {
			latitude: gpsData.GPSLatitude?.description || "",
			longitude: gpsData.GPSLongitude?.description || "",
		},
	};
}

function getDate(metadata: ExifReader.Tags) {
	const TimeInfo = [
		metadata.DateTimeOriginal?.description,
		metadata.OffsetTimeOriginal?.description,
		metadata.OffsetTimeDigitized?.description,
	];
	// const contextString = "2017-05-15T09:10:23-09:00";

	if (!TimeInfo[0]) {
		return { formattedDate: "No Date Found" };
	}
	const [date, time] = TimeInfo[0].split(" ");
	const contextString = `${date.replaceAll(":", "-")}T${time}`;

	// Parse the date string correctly
	const parsedDate = DateTime.fromISO(contextString);

	// Format output as mm/dd/yyyy [time] [name of timezone]
	const formattedDate = parsedDate.toFormat("MM/dd/yyyy hh:mm a");

	return { formattedDate };
}
