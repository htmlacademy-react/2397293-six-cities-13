import classNames from 'classnames';
import Card from '../../components/card/card';
import Header from '../../components/header/header';
import { useDocumentTitle } from '../../hooks/document-title';
import { useAppSelector } from '../../hooks/useSelectors';
import { FullOffer } from '../../types/types';
import { getFavoriteOffersByCity } from '../../utils/get-offers-by-city';
import { Link } from 'react-router-dom';
import { AppRouter } from '../../constants';

function FavoritesPage() {
	useDocumentTitle('Favorites');

	const favorites = useAppSelector((state) => state.favoritesData.favorites);

	const offersByCity: Record<string, FullOffer[]> =
		getFavoriteOffersByCity(favorites);

	return (
		<div
			className={classNames('page', {
				'page--favorites-empty': !favorites.length,
			})}
		>
			<Header />

			{favorites.length ? (
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
			) : (
				<main className="page__main page__main--favorites page__main--favorites-empty">
					<div className="page__favorites-container container">
						<section className="favorites favorites--empty">
							<h1 className="visually-hidden">Favorites (empty)</h1>
							<div className="favorites__status-wrapper">
								<b className="favorites__status">Nothing yet saved.</b>
								<p className="favorites__status-description">
									Save properties to narrow down search or plan your future
									trips.
								</p>
							</div>
						</section>
					</div>
				</main>
			)}
			<footer className="footer container">
				<Link className="footer__logo-link" to={AppRouter.Main}>
					<img
						className="footer__logo"
						src="img/logo.svg"
						alt="6 cities logo"
						width={64}
						height={33}
					/>
				</Link>
			</footer>
		</div>
	);
}

export default FavoritesPage;
