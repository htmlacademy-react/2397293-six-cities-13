import Card from '../../components/card/card';
import Header from '../../components/header/header';
import { useDocumentTitle } from '../../hooks/document-title';
import { FullOffer } from '../../types/types';
import { getFavoriteOffersByCity } from '../../utils';

interface FavoritesPageProps {
	offers: FullOffer[];
}

function FavoritesPage({ offers }: FavoritesPageProps) {
	useDocumentTitle('Favorites');

	const offersByCity: Record<string, FullOffer[]> =
		getFavoriteOffersByCity(offers);

	return (
		<div className="page">
			<Header />

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
			<footer className="footer container">
				<a className="footer__logo-link" href="main.html">
					<img
						className="footer__logo"
						src="img/logo.svg"
						alt="6 cities logo"
						width={64}
						height={33}
					/>
				</a>
			</footer>
		</div>
	);
}

export default FavoritesPage;
