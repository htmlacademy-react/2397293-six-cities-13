import { Link } from 'react-router-dom';
import { CITIES } from '../../constants';
import classNames from 'classnames';
import { ICity } from '../../types/types';
import { useAppDispatch } from '../../hooks/useSelectors';
import { setActiveCity } from '../../store/actions';

interface ICitiesListProps {
	activeCity: ICity['name'];
}

function CitiesList({ activeCity }: ICitiesListProps) {
	const dispatch = useAppDispatch();

	return (
		<div className="tabs">
			<section className="locations container">
				<ul className="locations__list tabs__list">
					{CITIES.map((city) => (
						<li className="locations__item" key={city}>
							<Link
								className={classNames('locations__item-link', 'tabs__item', {
									'tabs__item--active': city === activeCity,
								})}
								onClick={() => {
									dispatch(setActiveCity(city));
								}}
								to="#"
							>
								<span>{city}</span>
							</Link>
						</li>
					))}
				</ul>
			</section>
		</div>
	);
}

export default CitiesList;
