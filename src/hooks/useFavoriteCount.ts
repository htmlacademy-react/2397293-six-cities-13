import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from './useSelectors';
import { RequestStatus } from '../constants';
import { fetchFavorites } from '../store/thunks/favorites';
import { logout } from '../store/thunks/auth';

function useFavoriteCount() {
	const dispatch = useAppDispatch();

	const status = useAppSelector((state) => state.favoritesData.status);
	const count = useAppSelector((state) => state.favoritesData.favorites.length);

	useEffect(() => {
		if (status === RequestStatus.Idle) {
			dispatch(fetchFavorites());
		}
	}, [status, dispatch]);

	return count;
}

function useHandleLogout() {
	const dispatch = useAppDispatch();

	return function handleLogout(e: React.MouseEvent<HTMLAnchorElement>) {
		e.preventDefault();
		dispatch(logout());
	};
}

export { useFavoriteCount, useHandleLogout };
