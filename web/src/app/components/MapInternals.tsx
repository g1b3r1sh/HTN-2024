import { Label, useEvent, useMap } from "@mappedin/react-sdk";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { Id } from "../../../convex/_generated/dataModel";

function RoomLabels() {
	const { mapData } = useMap();

	return mapData.getByType("space").map((space) => {
		return <Label key={space.id} target={space.center} text={space.name} />;
	  });
}

const labelToDatabase = new Map<any, Id<"points">>();
export default function MapInternals() {
	const { mapView, mapData } = useMap();
	const points = useQuery(api.tasks.getPoints);
	const addPoint = useMutation(api.tasks.addPoint);
	const removePoint = useMutation(api.tasks.removePoint);

	function getCoordinate(latitude: number, longitude: number, floorId: string) {
		return mapView.createCoordinate(latitude, longitude, mapData.getByType('floor').find(floor => {floor.id === floorId}));
	}

	mapView.Labels.removeAll();
	if (points) {
		for (const point of points) {
			const label = mapView.Labels.add(getCoordinate(point.latitude, point.longitude, point.floorId), 'text', { interactive: true });
			labelToDatabase.set(label, point._id);
		}
	}

	useEvent("click", (event) => {	
		if (event.labels.length == 0) {
			const coord = event.coordinate;
			addPoint({ latitude: coord.latitude, longitude: coord.longitude, floorId: coord.floorId! });
		} else {
			const label = event.labels[0];
			if (labelToDatabase.has(label)) {
				removePoint({ id: labelToDatabase.get(label)! });
			}
		}
	});
	console.log(mapData.getByType('label'));

	return <></>
}