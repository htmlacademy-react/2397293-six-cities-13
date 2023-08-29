import { Link } from 'react-router-dom';
import { AppRouter, CITIES } from '../../constants';
import { useAppDispatch } from '../../hooks/useSelectors';
import { offersActions } from '../../store/offers-data/offers-data';
import { getRandomInteger } from '../../utils/generate-random-number';
import { useRef } from 'react';

function RandomCity() {
	const dispatch = useAppDispatch();
	const randomCity = useRef(CITIES[getRandomInteger(CITIES.length)]);

	return (
		<div className="locations__item">
			<Link
				className="locations__item-link"
				to={AppRouter.Main}
				onClick={() =>
					dispatch(offersActions.setActiveCity(randomCity.current))}
			>
				<span>{randomCity.current}</span>
			</Link>
		</div>
	);
}

export default RandomCity;
