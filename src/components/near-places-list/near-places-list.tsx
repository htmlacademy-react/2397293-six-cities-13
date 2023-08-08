import { SetStateAction, useEffect, useState } from 'react';
import { FullOffer } from '../../types/types';
import Card from '../card/card';

interface NearPlacesListProps {
	nearPlaces: FullOffer[];
	onSelectNearPlace: React.Dispatch<SetStateAction<FullOffer | undefined>>;
}

function NearPlacesList({
	nearPlaces,
	onSelectNearPlace,
}: NearPlacesListProps) {
	const [selectOffer, setSelectOffer] = useState<FullOffer | undefined>(
		undefined
	);

	const handleSelectOfferChange = (
		offer: SetStateAction<FullOffer | undefined>
	) => {
		setSelectOffer(offer);
	};

	useEffect(() => {
		onSelectNearPlace(selectOffer);
	}, [selectOffer, onSelectNearPlace]);

	return (
		<div className="near-places__list places__list">
			{nearPlaces.map((nearPlace) => (
				<Card
					key={nearPlace.id}
					{...nearPlace}
					bemClassTitle="near-places"
					onMouseEnter={() => handleSelectOfferChange(nearPlace)}
					onMouseLeave={() => handleSelectOfferChange(undefined)}
				/>
			))}
		</div>
	);
}

export default NearPlacesList;
