import { Link } from 'react-router-dom';
import { CITIES } from '../../constants';

function CitiesTabs() {
	return (
		<>
			<h1 className="visually-hidden">Cities</h1>
			<div className="tabs">
				<section className="locations container">
					<ul className="locations__list tabs__list">
						{CITIES.map((city) => (
							<li className="locations__item" key={city}>
								<Link
									className={`locations__item-link tabs__item ${
										city === 'Amsterdam' ? 'tabs__item--active' : ''
									}`}
									to="#"
								>
									<span>{city}</span>
								</Link>
							</li>
						))}
					</ul>
				</section>
			</div>
		</>
	);
}

export default CitiesTabs;
