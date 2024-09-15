import { MapView, useMapData } from "@mappedin/react-sdk";

export default function Map() {
	const { isLoading, error, mapData } = useMapData({
		key: "mik_Qar1NBX1qFjtljLDI52a60753",
		secret: "mis_CXFS9WnkQkzQmy9GCt4ucn2D68zNRgVa2aiJj5hEIFM8aa40fee",
		mapId: "66ce20fdf42a3e000b1b0545"
	});

	if (isLoading) {
		return <div>Loading</div>;
	}

	if (error) {
		return <div>{error.message}</div>
	}

	return mapData ? <MapView mapData={mapData} style={{width: "1000px", height: "500px"}}></MapView> : null
}
