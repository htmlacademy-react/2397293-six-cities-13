import { Navigate } from 'react-router-dom';
import { AppRouter, AuthStatus } from '../../constants';
import { useAppSelector } from '../../hooks/useSelectors';

interface PrivateRouteProps {
	children: React.ReactNode;
}

function PrivateRoute({ children }: PrivateRouteProps) {
	const authStatus = useAppSelector(
		(state) => state.authData.authorizationStatus
	);

	return authStatus === AuthStatus.Auth ? (
		children
	) : (
		<Navigate to={AppRouter.Login} />
	);
}

export default PrivateRoute;
