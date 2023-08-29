import Card from '../../components/card/card';
import Header from '../../components/header/header';
import { useDocumentTitle } from '../../hooks/document-title';
import { useAppSelector } from '../../hooks/useSelectors';
import { FullOffer } from '../../types/types';
import { getFavoriteOffersByCity } from '../../utils/get-offers-by-city';
import Footer from '../../components/footer/footer';
import FavoritesEmptyPage from '../favorites-empty/favorites-empty';

function FavoritesPage() {
	useDocumentTitle('Favorites');

	const favorites = useAppSelector((state) => state.favoritesData.favorites);

	const offersByCity: Record<string, FullOffer[]> =
		getFavoriteOffersByCity(favorites);

	if (!favorites.length) {
		return <FavoritesEmptyPage />;
	}

	return (
		<div className="page">
			<Header withNavigation />

			<main className="page__main page__main--favorites">
				<div className="page__favorites-container container">
					<section className="favorites">
						<h1 className="favorites__title">Saved listing</h1>
						<ul className="favorites__list">
							{Object.entries(offersByCity).map(([city, cards]) => (
								// eslint-disable-next-line
								<li key={city} className="favorites__locations-items">
									<div className="favorites__locations locations locations--current">
										<div className="locations__item">
											<a className="locations__item-link" href="#">
												<span>{city}</span>
											</a>
										</div>
									</div>
									<div className="favorites__places">
										{cards.map((offer) => (
											<Card
												{...offer}
												bemClassTitle="favorites"
												key={offer.id}
											/>
										))}
									</div>
								</li>
							))}
						</ul>
					</section>
				</div>
			</main>

			<Footer />
		</div>
	);
}

export default FavoritesPage;
