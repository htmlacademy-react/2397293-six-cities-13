import { Navigate } from 'react-router-dom';
import { AppRouter, AuthStatus } from '../../constants';
import { ReactNode } from 'react';

type AccessRouteProps = {
	children: ReactNode;
	status: AuthStatus;
};

// eslint-disable-next-line react/display-name
const createAccessRoute =
	(accessStatus: AuthStatus, navigateRoute: string) =>
		({ children, status }: AccessRouteProps) => {
			if (status === accessStatus) {
				return children;
			}
			return <Navigate to={navigateRoute} />;
		};

export const PrivateRoute = createAccessRoute(AuthStatus.Auth, AppRouter.Login);
export const PublicRoute = createAccessRoute(
	AuthStatus.NotAuth,
	AppRouter.Main
);
