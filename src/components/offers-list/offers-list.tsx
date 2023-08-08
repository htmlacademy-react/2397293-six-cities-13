import { FullOffer } from '../../types/types';
import Card from '../card/card';
import Map from '../../components/map/map';
import { SetStateAction, useState } from 'react';

interface OffersListProps {
	activeCity: string;
	offers: FullOffer[];
}

function OffersList({ activeCity, offers }: OffersListProps) {
	const [selectOffer, setSelectOffer] = useState<FullOffer | undefined>(
		undefined
	);

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
				<form className="places__sorting" action="#" method="get">
					<span className="places__sorting-caption">Sort by</span>{' '}
					<span className="places__sorting-type" tabIndex={0}>
						Popular
						<svg className="places__sorting-arrow" width="7" height="4">
							<use href="#icon-arrow-select"></use>
						</svg>
					</span>
					<ul className="places__options places__options--custom places__options--opened">
						<li className="places__option places__option--active" tabIndex={0}>
							Popular
						</li>
						<li className="places__option" tabIndex={0}>
							Price: low to high
						</li>
						<li className="places__option" tabIndex={0}>
							Price: high to low
						</li>
						<li className="places__option" tabIndex={0}>
							Top rated first
						</li>
					</ul>
				</form>
				<div className="cities__places-list places__list tabs__content">
					{offers.map((offer) => (
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
