














function bareMetadataSetup({ gpsData, metadata }) {
	console.log(gpsData, metadata, "show these");
	const area = convertGPSToString(gpsData);
	// const areaString = encodeURIComponent(area.gpsToString);
	// const src = `https://www.google.com/maps/embed/v1/place?q=${areaString}&key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}`;
	// const photoDate = getDate(metadata);

	// return { src, photoDate };
}




function convertToDMS(coordinates): string {
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

function convertGPSToString(gpsData) {
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

export default bareMetadataSetup;