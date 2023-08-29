import { Link } from 'react-router-dom';
import { AppRouter } from '../../constants';
import { useAppSelector } from '../../hooks/useSelectors';
import {
	useFavoriteCount,
	useHandleLogout,
} from '../../hooks/useFavoriteCount';

function NavForLogged() {
	const userData = useAppSelector((state) => state.authData.authData);
	const favoriteCount = useFavoriteCount();
	const handleLogout = useHandleLogout();

	return (
		<ul className="header__nav-list">
			<li className="header__nav-item user">
				<Link
					className="header__nav-link header__nav-link--profile"
					to={AppRouter.Favorites}
				>
					<div className="header__avatar-wrapper user__avatar-wrapper">
						<img
							src={userData?.avatarUrl}
							alt="Avatar"
							height={20}
							width={20}
							style={{ borderRadius: '50%' }}
						/>
					</div>
					<span className="header__user-name user__name">
						{userData?.email}
					</span>
					<span className="header__favorite-count">{favoriteCount}</span>
				</Link>
			</li>
			<li className="header__nav-item">
				<a className="header__nav-link" href="#">
					<span className="header__signout" onClick={handleLogout}>
						Sign out
					</span>
				</a>
			</li>
		</ul>
	);
}

export default NavForLogged;
