import Header from '../../components/header/header';
import OffersList from '../../components/offers-list/offers-list';
import { useDocumentTitle } from '../../hooks/document-title';
import { FullOffer } from '../../types/types';
import { getOffersByCity } from '../../utils/get-offers-by-city';
import { useAppDispatch, useAppSelector } from '../../hooks/useSelectors';
import CitiesList from '../../components/cities-list/cities-list';
import { useEffect } from 'react';
import { fetchFavorites } from '../../store/thunks/favorites';
import { getAllOffers } from '../../store/thunks/offers';
import MainEmptyPage from '../main-empty/main-empty';
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
		dispatch(fetchFavorites());
	}, [dispatch]);

	if (statusFetchingAllOffers === RequestStatus.Loading) {
		return (
			<div
				style={{
					width: '100%',
					height: '100vh',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
				}}
			>
				<ClipLoader color="#378dcc" size={40} />
			</div>
		);
	}

	return (
		<div className="page page--gray page--main">
			<Header withNavigation />

			{currentOffers ? (
				<main className="page__main page__main--index">
					<h1 className="visually-hidden">Cities</h1>
					<CitiesList activeCity={activeCity} />
					<div className="cities">
						<OffersList activeCity={activeCity} offers={currentOffers} />
					</div>
				</main>
			) : (
				<main className="page__main page__main--index page__main--index-empty">
					<h1 className="visually-hidden">Cities</h1>
					<CitiesList activeCity={activeCity} />
					<div className="cities">
						<MainEmptyPage activeCity={activeCity} />
					</div>
				</main>
			)}
		</div>
	);
}

export default MainPage;
