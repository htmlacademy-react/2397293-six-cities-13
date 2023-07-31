import CitiesTabs from '../../components/cities-tabs/cities-tabs';
import Header from '../../components/header/header';
import Map from '../../components/map/map';
import OffersList from '../../components/offers-list/offers-list';
import { useDocumentTitle } from '../../hooks/document-title';
import { CITY } from '../../mocks/city';
import { POINTS } from '../../mocks/points';
import { IOffer, IPoint } from '../../types/types';

interface MainPageProps {
	offersCount: number;
	offers: IOffer[];
}

function MainPage({ offersCount, offers }: MainPageProps) {
	useDocumentTitle('MainPage');

	const selectedPoint: IPoint | undefined = undefined;

	return (
		<div className="page page--gray page--main">
			<Header />
			<main className="page__main page__main--index">
				<CitiesTabs />
				<div className="cities">
					<div className="cities__places-container container">
						<OffersList offersCount={offersCount} offers={offers} />
						<div className="cities__right-section">
							<section className="cities__map map">
								<Map
									city={CITY}
									points={POINTS}
									selectedPoint={selectedPoint}
								/>
							</section>
						</div>
					</div>
				</div>
			</main>
		</div>
	);
}

export default MainPage;
