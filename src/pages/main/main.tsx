import Header from '../../components/header/header';
import OffersList from '../../components/offers-list/offers-list';
import { useDocumentTitle } from '../../hooks/document-title';
import { FullOffer } from '../../types/types';
import { getOffersByCity } from '../../utils';
import { useAppSelector } from '../../hooks/useSelectors';
import CitiesList from '../../components/cities-list/cities-list';

function MainPage() {
	useDocumentTitle('MainPage');

	const offers = useAppSelector((state) => state.offersData.offers);
	const activeCity = useAppSelector((state) => state.offersData.activeCity);

	const offersByCity: Record<string, FullOffer[]> = getOffersByCity(offers);

	const currentOffers = offersByCity[activeCity];

	return (
		<div className="page page--gray page--main">
			<Header />
			<main className="page__main page__main--index">
				<h1 className="visually-hidden">Cities</h1>
				<CitiesList activeCity={activeCity} />
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
