import { Link } from 'react-router-dom';
import Logo from '../logo/logo';
import { AppRouter, AuthStatus } from '../../constants';
import { useAppDispatch, useAppSelector } from '../../hooks/useSelectors';
import { logout } from '../../store/thunks/auth';

function Header() {
	const dispatch = useAppDispatch();

	const user = useAppSelector((state) => state.authData.authData);
	const authStatus = useAppSelector(
		(state) => state.authData.authorizationStatus
	);
	const favorites = useAppSelector((state) => state.favoritesData.favorites);

	const handleLogout = () => {
		dispatch(logout());
	};

	return (
		<header className="header">
			<div className="container">
				<div className="header__wrapper">
					<div className="header__left">
						<Logo />
					</div>

					<nav className="header__nav">
						<ul className="header__nav-list">
							{authStatus === AuthStatus.Auth ? (
								<>
									<li className="header__nav-item user">
										<Link
											className="header__nav-link header__nav-link--profile"
											to={AppRouter.Favorites}
										>
											<div className="header__avatar-wrapper user__avatar-wrapper">
												<img
													src={user?.avatarUrl}
													alt="Avatar"
													height={20}
													width={20}
													style={{ borderRadius: '50%' }}
												/>
											</div>
											<span className="header__user-name user__name">
												{user?.email}
											</span>
											<span className="header__favorite-count">
												{favorites.length}
											</span>
										</Link>
									</li>
									<li className="header__nav-item">
										<Link className="header__nav-link" to={'#'}>
											<span className="header__signout" onClick={handleLogout}>
												Sign out
											</span>
										</Link>
									</li>
								</>
							) : (
								<li className="header__nav-item">
									<Link className="header__nav-link" to={AppRouter.Login}>
										<span className="header__signout">Sign in</span>
									</Link>
								</li>
							)}
						</ul>
					</nav>
				</div>
			</div>
		</header>
	);
}

export default Header;
