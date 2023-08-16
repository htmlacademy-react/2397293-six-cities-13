import { FullOffer } from '../../types/types';
import Card from '../card/card';
import Map from '../../components/map/map';
import { SetStateAction, useState } from 'react';
import { useAppSelector } from '../../hooks/useSelectors';
import SortingForm from '../sorting-form/sorting-form';
import { sortingHelper } from '../../utils/sorting';

interface OffersListProps {
	activeCity: string;
	offers: FullOffer[];
}

function OffersList({ activeCity, offers }: OffersListProps) {
	const [selectOffer, setSelectOffer] = useState<FullOffer | undefined>(
		undefined
	);

	const { sorting } = useAppSelector((state) => state.offersData);

	const handleSelectOfferChange = (
		offer: SetStateAction<FullOffer | undefined>
	) => {
		setSelectOffer(offer);
	};

	return (
		<div className="cities__places-container container">
			<section className="cities__places places">
				<h2 className="visually-hidden">Places</h2>
				<b className="places__found">
					{offers.length} places to stay in {activeCity}
				</b>
				<SortingForm />
				<div className="cities__places-list places__list tabs__content">
					{sortingHelper[sorting](offers).map((offer) => (
						<Card
							key={offer.id}
							{...offer}
							bemClassTitle="cities"
							onMouseEnter={() => handleSelectOfferChange(offer)}
							onMouseLeave={() => handleSelectOfferChange(undefined)}
						/>
					))}
				</div>
			</section>
			<div className="cities__right-section">
				<Map
					city={offers[0].city}
					points={offers}
					selectOffer={selectOffer}
					titleByClassName={'cities'}
				/>
			</div>
		</div>
	);
}

export default OffersList;
