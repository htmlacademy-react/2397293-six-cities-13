import { Link } from 'react-router-dom';
import Logo from '../logo/logo';
import { AppRouter, AuthStatus } from '../../constants';
import NavForLogged from '../nav-for-logged/nav-for-logged';
import { useAppSelector } from '../../hooks/useSelectors';

interface HeaderProps {
	withNavigation: boolean;
}

function Header({ withNavigation }: HeaderProps) {
	const authStatus = useAppSelector(
		(state) => state.authData.authorizationStatus
	);

	return (
		<header className="header">
			<div className="container">
				<div className="header__wrapper">
					<div className="header__left">
						<Logo />
					</div>

					{withNavigation && (
						<nav className="header__nav">
							{authStatus === AuthStatus.Auth ? (
								<NavForLogged />
							) : (
								<ul className="header__nav-list">
									<li className="header__nav-item">
										<Link
											className="header__nav-link header__nav-link--profile"
											to={AppRouter.Login}
										>
											<div className="header__avatar-wrapper user__avatar-wrapper"></div>
											<span className="header__login">Sign in</span>
										</Link>
									</li>
								</ul>
							)}
						</nav>
					)}
				</div>
			</div>
		</header>
	);
}

export default Header;
