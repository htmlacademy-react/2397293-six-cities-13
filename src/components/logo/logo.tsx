import { Link, useLocation } from 'react-router-dom';
import { AppRouter } from '../../constants';
import classNames from 'classnames';

function Logo() {
	const { pathname } = useLocation();

	return (
		<Link
			className={classNames('header__logo-link', {
				'header__logo-link--active': pathname === AppRouter.Main,
			})}
			to={AppRouter.Main}
		>
			<img
				className="header__logo"
				src="img/logo.svg"
				alt="6 cities logo"
				width={81}
				height={41}
			/>
		</Link>
	);
}

export default Logo;
