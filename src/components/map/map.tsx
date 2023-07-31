import { useEffect, useRef } from 'react';
import useMap from '../../hooks/useMap';
import { URL_MARKER_CURRENT, URL_MARKER_DEFAULT } from '../../constants';
import { ICity, IPoint } from '../../types/types';
import { Icon, Marker, layerGroup } from 'leaflet';
import 'leaflet/dist/leaflet.css';

interface MapProps {
	city: ICity;
	points: IPoint[];
	selectedPoint: IPoint | undefined;
}

const defaultCustomIcon = new Icon({
	iconUrl: URL_MARKER_DEFAULT,
	iconSize: [40, 40],
	iconAnchor: [20, 40],
});

const currentCustomIcon = new Icon({
	iconUrl: URL_MARKER_CURRENT,
	iconSize: [40, 40],
	iconAnchor: [20, 40],
});

function Map(props: MapProps) {
	const { city, points, selectedPoint } = props;

	const mapRef = useRef(null);
	const map = useMap(mapRef, city);

	useEffect(() => {
		if (map) {
			const markerLayer = layerGroup().addTo(map);
			points.forEach((point) => {
				const marker = new Marker({
					lat: point.lat,
					lng: point.lng,
				});

				marker
					.setIcon(
						selectedPoint !== undefined && point.title === selectedPoint.title
							? currentCustomIcon
							: defaultCustomIcon
					)
					.addTo(markerLayer);
			});

			return () => {
				map.removeLayer(markerLayer);
			};
		}
	}, [map, points, selectedPoint]);

	return <div style={{ height: '100%', width: '514px' }} ref={mapRef}></div>;
}

export default Map;