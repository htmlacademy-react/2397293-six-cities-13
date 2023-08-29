import { useAppDispatch } from '../../hooks/useSelectors';
import { fetchFavorites } from '../../store/thunks/favorites';
import { getAllOffers } from '../../store/thunks/offers';
import styles from './error-screen.module.css';

export function ErrorScreen(): JSX.Element {
	const dispatch = useAppDispatch();

	return (
		<div className="page page--gray container">
			<h1>Oops! Something went wrong.</h1>
			<button
				onClick={() => {
					dispatch(getAllOffers());
					dispatch(fetchFavorites());
				}}
				className={`button ${styles.button}`}
				type="button"
			>
				Try again
			</button>
		</div>
	);
}
