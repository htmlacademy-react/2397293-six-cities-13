import CitiesTabs from '../../components/cities-tabs/cities-tabs';
import Header from '../../components/header/header';
import OffersList from '../../components/offers-list/offers-list';
import { useDocumentTitle } from '../../hooks/document-title';
import { IOffer } from '../../mocks/offers';

interface MainPageProps {
	offersCount: number;
	offers: IOffer[];
}

function MainPage({ offersCount, offers }: MainPageProps) {
	useDocumentTitle('MainPage');

	return (
		<div className="page page--gray page--main">
			<Header />
			<main className="page__main page__main--index">
				<CitiesTabs />
				<div className="cities">
					<div className="cities__places-container container">
						<OffersList offersCount={offersCount} offers={offers} />
						<div className="cities__right-section">
							<section className="cities__map map"></section>
						</div>
					</div>
				</div>
			</main>
		</div>
	);
}

export default MainPage;
