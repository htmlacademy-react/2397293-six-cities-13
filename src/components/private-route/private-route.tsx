import { Navigate } from 'react-router-dom';
import { AppRouter, AuthStatus } from '../../constants';

interface PrivateRouteProps {
	authStatus: AuthStatus;
	children: React.ReactNode;
}

function PrivateRoute(props: PrivateRouteProps) {
	const { authStatus, children } = props;
	return authStatus === AuthStatus.Auth ? (
		children
	) : (
		<Navigate to={AppRouter.Login} />
	);
}

export default PrivateRoute;
