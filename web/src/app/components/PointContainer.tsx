import { useMutation, useQuery } from "convex/react";
import Map from "./Map";
import { api } from "../../../convex/_generated/api";
import { Id } from "../../../convex/_generated/dataModel";

export interface Coord {
	latitude: number,
	longitude: number,
	floorId: string,
}

export interface Point {
	id: string,
	coord: Coord
}

export function hashCoord(coord: Coord) {
	return JSON.stringify([coord.latitude, coord.longitude, coord.floorId]);
}

export default function PointContainer() {
	const points = useQuery(api.tasks.getPoints);
	const addPoint = useMutation(api.tasks.addPoint);
	const removePoint = useMutation(api.tasks.removePoint);

	const mapPoints = points?.map(point => {return { id: point._id, coord: {latitude: point.latitude, longitude: point.longitude, floorId: point.floorId} }})

	return <div><Map points={mapPoints ?? []} onClick={addPoint} onClickLabel={(id) => {
		removePoint({id: id as Id<"points">})
	}}/></div>
}