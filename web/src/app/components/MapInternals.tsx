import { Label, useEvent, useMap } from "@mappedin/react-sdk";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { Id } from "../../../convex/_generated/dataModel";
import { Coord, Point } from "./PointContainer";

function RoomLabels() {
	const { mapData } = useMap();

	return mapData.getByType("space").map((space) => {
		return <Label key={space.id} target={space.center} text={space.name} />;
	  });
}

const labelToId = new Map<any, string>();
export default function MapInternals({points, onClick, onClickLabel}: {
	points: Point[],
	onClick: (coord: Coord) => void,
	onClickLabel: (id: string) => void
}) {
	const { mapView, mapData } = useMap();

	function getCoordinate(latitude: number, longitude: number, floorId: string) {
		return mapView.createCoordinate(latitude, longitude, mapData.getByType('floor').find(floor => {floor.id === floorId}));
	}

	mapView.Labels.removeAll();
	if (points) {
		for (const point of points) {
			const coord = point.coord;
			const label = mapView.Labels.add(getCoordinate(coord.latitude, coord.longitude, coord.floorId), 'text', { interactive: true });
			labelToId.set(label, point.id);
		}
	}

	useEvent("click", (event) => {	
		if (event.labels.length == 0) {
			const coord = event.coordinate;
			if (coord.floorId) {
				onClick({ latitude: coord.latitude, longitude: coord.longitude, floorId: coord.floorId! });
			}
		} else {
			const label = event.labels[0];
			if (labelToId.has(label)) {
				onClickLabel(labelToId.get(label)!);
			}
		}
	});
	console.log(mapData.getByType('label'));

	return <></>
}