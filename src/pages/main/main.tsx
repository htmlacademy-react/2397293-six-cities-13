import { useState } from 'react';
import Header from '../../components/header/header';
import OffersList from '../../components/offers-list/offers-list';
import { useDocumentTitle } from '../../hooks/document-title';
import { FullOffer } from '../../types/types';
import { getOffersByCity } from '../../utils';
import { CITIES } from '../../constants';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

interface MainPageProps {
	offers: FullOffer[];
}

function MainPage({ offers }: MainPageProps) {
	useDocumentTitle('MainPage');

	const offersByCity: Record<string, FullOffer[]> = getOffersByCity(offers);

	const cities = [];
	cities.push(...CITIES);

	const [activeCity, setActiveCity] = useState(cities[0]);

	const currentOffers = offersByCity[activeCity];

	return (
		<div className="page page--gray page--main">
			<Header />
			<main className="page__main page__main--index">
				<h1 className="visually-hidden">Cities</h1>
				<div className="tabs">
					<section className="locations container">
						<ul className="locations__list tabs__list">
							{cities.map((city) => (
								<li className="locations__item" key={city}>
									<Link
										className={classNames(
											'locations__item-link',
											'tabs__item',
											{ 'tabs__item--active': city === activeCity }
										)}
										onClick={() => {
											setActiveCity(city);
										}}
										to="#"
									>
										<span>{city}</span>
									</Link>
								</li>
							))}
						</ul>
					</section>
				</div>
				<div className="cities">
					{currentOffers ? (
						<OffersList activeCity={activeCity} offers={currentOffers} />
					) : (
						<div className="cities__places-container cities__places-container--empty container">
							<section className="cities__no-places">
								<div className="cities__status-wrapper tabs__content">
									<b className="cities__status">No places to stay available</b>
									<p className="cities__status-description">
										We could not find any property available at the moment in{' '}
										{activeCity}
									</p>
								</div>
							</section>
							<div className="cities__right-section" />
						</div>
					)}
				</div>
			</main>
		</div>
	);
}

export default MainPage;
