import { useEffect, useRef } from 'react';
import useMap from '../../hooks/useMap';
import { URL_MARKER_CURRENT, URL_MARKER_DEFAULT } from '../../constants';
import { FullOffer, ICity } from '../../types/types';
import { Icon, Marker, layerGroup } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useAppSelector } from '../../hooks/useSelectors';

interface MapProps {
	city: ICity;
	points: FullOffer[];
	titleByClassName: string;
}

const defaultCustomIcon = new Icon({
	iconUrl: URL_MARKER_DEFAULT,
	iconSize: [27, 39],
	iconAnchor: [13.5, 39],
});

const currentCustomIcon = new Icon({
	iconUrl: URL_MARKER_CURRENT,
	iconSize: [27, 39],
	iconAnchor: [13.5, 39],
});

function Map({ city, points, titleByClassName }: MapProps) {
	const mapRef = useRef(null);
	const map = useMap(mapRef, city);
	const selectOffer = useAppSelector((state) => state.offersData.activeOffer);

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
						selectOffer !== null && point.id === selectOffer.id
							? currentCustomIcon
							: defaultCustomIcon
					)
					.addTo(markerLayer);
			});

			return () => {
				map.removeLayer(markerLayer);
			};
		}
	}, [map, points, selectOffer, city, titleByClassName]);

	useEffect(() => {
		if (city) {
			map?.setView(
				[city.location.latitude, city.location?.longitude],
				city.location.zoom
			);
		}
	}, [city, map]);

	return (
		<section
			ref={mapRef}
			className={`${titleByClassName}__map map`}
			// style={{
			// 	height: '100%',
			// 	minHeight: '514px',
			// }}
		/>
	);
}

export default Map;
