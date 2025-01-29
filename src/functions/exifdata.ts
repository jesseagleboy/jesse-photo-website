import ExifReader from "exifreader";
import { DateTime } from "luxon";

export interface DataTypes {
	metadata: ExifReader.Tags;
	image_data: ImageMetadata;
	googleMapsSrc: string;
	date: string;
}

interface GPSStringReturnType {
	gpsToString: string;
	gpsData: {
		latitude: string;
		longitude: string;
	};
}
export async function setupExifData([path, image]: [string, { default: ImageMetadata }]): Promise<DataTypes> {
	const newPath = path.slice(1);
	const metadata = await ExifReader.load(newPath);
	const gpsData = metadata;
	const area = convertGPSToString(gpsData);
	const areaString = encodeURIComponent(area.gpsToString);
	const src = `https://www.google.com/maps/embed/v1/place?q=${areaString}&key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}`;
	const photoDate = getDate(metadata);

	return {
		metadata,
		image_data: image.default,
		googleMapsSrc: src,
		date: photoDate.formattedDate,
	};
}

function convertToDMS(coordinates) {
		const degrees = coordinates.value[0][0];
		const minutes = coordinates.value[1][0];
		const seconds = (coordinates.value[2][0] / coordinates.value[2][1]).toFixed(
			1,
		);
		return `${degrees}°${minutes}'${seconds}"`;
	}

 function convertGPSToString(gpsData: ExifReader.Tags): GPSStringReturnType {
	

	const lat = convertToDMS(gpsData.GPSLatitude);
	const lng = convertToDMS(gpsData.GPSLongitude);
	const latDir = gpsData.GPSLatitudeRef.value[0];
	const lngDir = gpsData.GPSLongitudeRef.value[0];

	return {
		gpsToString: `${lat}${latDir} ${lng}${lngDir}`,
		gpsData: {
			latitude: gpsData.GPSLatitude.description,
			longitude: gpsData.GPSLongitude.description,
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
