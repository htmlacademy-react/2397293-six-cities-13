import { FullOffer } from '../../types/types';
import Card from '../card/card';
import Map from '../../components/map/map';
import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/useSelectors';
import SortingForm from '../sorting-form/sorting-form';
import { sortingHelper } from '../../utils/sorting';
import { offersActions } from '../../store/offers-data/offers-data';

interface OffersListProps {
	activeCity: string;
	offers: FullOffer[];
}

function OffersList({ activeCity, offers }: OffersListProps) {
	const dispatch = useAppDispatch();

	const { sorting } = useAppSelector((state) => state.offersData);

	const handleActiveOfferChange = useCallback(
		(offer: FullOffer | null) => {
			dispatch(offersActions.setActiveOffer(offer));
		},
		[dispatch]
	);

	return (
		<div className="cities__places-container container">
			<section className="cities__places places">
				<h2 className="visually-hidden">Places</h2>
				<b className="places__found">
					{offers.length} {offers.length === 1 ? 'place' : 'places'} to stay in{' '}
					{activeCity}
				</b>
				<SortingForm />
				<div className="cities__places-list places__list tabs__content">
					{sortingHelper[sorting](offers).map((offer) => (
						<Card
							key={offer.id}
							{...offer}
							bemClassTitle="cities"
							onMouseEnter={() => handleActiveOfferChange(offer)}
							onMouseLeave={() => handleActiveOfferChange(null)}
						/>
					))}
				</div>
			</section>
			<div className="cities__right-section">
				<Map
					city={offers[0].city}
					points={offers}
					titleByClassName={'cities'}
				/>
			</div>
		</div>
	);
}

export default OffersList;
