import Header from '../../components/header/header';
import OffersList from '../../components/offers-list/offers-list';
import { useDocumentTitle } from '../../hooks/document-title';
import { FullOffer } from '../../types/types';
import { getOffersByCity } from '../../utils/get-offers-by-city';
import { useAppDispatch, useAppSelector } from '../../hooks/useSelectors';
import CitiesList from '../../components/cities-list/cities-list';
import { useEffect } from 'react';
import { getAllOffers } from '../../store/thunks/offers';
import { RequestStatus } from '../../constants';
import { ClipLoader } from 'react-spinners';

function MainPage() {
	useDocumentTitle('MainPage');

	const dispatch = useAppDispatch();

	const offers = useAppSelector((state) => state.offersData.offers);
	const activeCity = useAppSelector((state) => state.offersData.activeCity);
	const statusFetchingAllOffers = useAppSelector(
		(state) => state.offersData.statusFetchingAllOffers
	);

	const offersByCity: Record<string, FullOffer[]> = getOffersByCity(offers);

	const currentOffers = offersByCity[activeCity];

	useEffect(() => {
		dispatch(getAllOffers());
	}, [dispatch]);

	return (
		<div className="page page--gray page--main">
			<Header />
			{statusFetchingAllOffers === RequestStatus.Loading ? (
				<div
					style={{
						width: '100%',
						height: '100%',
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
					}}
				>
					<ClipLoader color="#378dcc" size={40} />
				</div>
			) : (
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
										<b className="cities__status">
											No places to stay available
										</b>
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
			)}
		</div>
	);
}

export default MainPage;
