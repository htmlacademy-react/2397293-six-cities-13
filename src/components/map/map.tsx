import { useEffect, useRef } from 'react';
import useMap from '../../hooks/useMap';
import { URL_MARKER_CURRENT, URL_MARKER_DEFAULT } from '../../constants';
import { FullOffer, ICity } from '../../types/types';
import { Icon, Marker, layerGroup } from 'leaflet';
import 'leaflet/dist/leaflet.css';

interface MapProps {
	city: ICity;
	points: FullOffer[];
	selectOffer?: FullOffer | undefined;
	titleByClassName: string;
}

const defaultCustomIcon = new Icon({
	iconUrl: URL_MARKER_DEFAULT,
	iconSize: [30, 40],
	iconAnchor: [20, 40],
});

const currentCustomIcon = new Icon({
	iconUrl: URL_MARKER_CURRENT,
	iconSize: [30, 40],
	iconAnchor: [20, 40],
});

function Map({ city, points, selectOffer, titleByClassName }: MapProps) {
	const mapRef = useRef(null);
	const map = useMap(mapRef, city);

	useEffect(() => {
		if (map) {
			const markerLayer = layerGroup().addTo(map);
			points.forEach((point) => {
				const marker = new Marker({
					lat: point.location.latitude,
					lng: point.location.longitude,
				});

				marker
					.setIcon(
						selectOffer !== undefined && point.title === selectOffer.title
							? currentCustomIcon
							: defaultCustomIcon
					)
					.addTo(markerLayer);
			});

			return () => {
				map.removeLayer(markerLayer);
			};
		}
	}, [map, points, selectOffer]);

	return (
		<section
			ref={mapRef}
			className={`${titleByClassName}__map map`}
			style={{
				height: '100%',
				minHeight: '514px',
			}}
		/>
	);
}

export default Map;
