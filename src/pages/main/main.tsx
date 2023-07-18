import Card from '../../components/card/card';
import CitiesTabs from '../../components/cities-tabs/cities-tabs';
import Header from '../../components/header/header';
import { useDocumentTitle } from '../../hooks/document-title';

interface MainPageProps {
	offersCount: number;
}

function MainPage({ offersCount }: MainPageProps) {
	useDocumentTitle('MainPage');

	return (
		<div className="page page--gray page--main">
			<Header />
			<main className="page__main page__main--index">
				<CitiesTabs />
				<div className="cities">
					<div className="cities__places-container container">
						<section className="cities__places places">
							<h2 className="visually-hidden">Places</h2>
							<b className="places__found">
								{offersCount} places to stay in Amsterdam
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
									<li
										className="places__option places__option--active"
										tabIndex={0}
									>
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
								<Card
									isPremium
									price={120}
									isFavorite={false}
									rating={4}
									description="Beautiful &amp; luxurious apartment at great location"
									type="Apartment"
									imageSrc="img/apartment-01.jpg"
								/>
								<Card
									isPremium={false}
									price={80}
									isFavorite
									rating={4}
									description="Wood and stone place"
									type="Private room"
									imageSrc="img/room.jpg"
								/>
								<Card
									isPremium={false}
									price={132}
									isFavorite={false}
									rating={4}
									description="Canal View Prinsengracht"
									type="Apartment"
									imageSrc="img/apartment-02.jpg"
								/>
								<Card
									isPremium
									price={180}
									isFavorite={false}
									rating={5}
									description="Nice, cozy, warm big bed apartment"
									type="Apartment"
									imageSrc="img/apartment-03.jpg"
								/>
								<Card
									isPremium={false}
									price={80}
									isFavorite
									rating={4}
									description="Wood and stone place"
									type="Private room"
									imageSrc="img/room.jpg"
								/>
							</div>
						</section>
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
