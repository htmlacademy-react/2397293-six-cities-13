import { Navigate } from 'react-router-dom';
import { AppRouter, AuthStatus } from '../../constants';
import { ReactNode } from 'react';
import { ClipLoader } from 'react-spinners';

type AccessRouteProps = {
	children: ReactNode;
	status: AuthStatus;
};

const createAccessRoute =
	(accessStatus: AuthStatus, navigateRoute: string) =>
	// eslint-disable-next-line react/display-name
		({ children, status }: AccessRouteProps) => {
			if (status === AuthStatus.Unknown) {
				return (
					<div
						style={{
							width: '100%',
							height: '100vh',
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
						}}
					>
						<ClipLoader color="#378dcc" size={40} />
					</div>
				);
			}
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
