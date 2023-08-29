import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainPage from '../../pages/main/main';
import { AppRouter } from '../../constants';
import LoginPage from '../../pages/login/login';
import FavoritesPage from '../../pages/favorites/favorites';
import OfferPage from '../../pages/offer/offer';
import NotFoundScreen from '../../pages/not-found-screen/not-found-screen';
import { useAppSelector } from '../../hooks/useSelectors';
import { ErrorScreen } from '../../pages/error-screen/error-screen';
import { PrivateRoute, PublicRoute } from '../private-route/private-route';

function App() {
	const hasError = useAppSelector(
		(state) => state.offersData.hasErrorOfferLoading
	);
	const authStatus = useAppSelector(
		(state) => state.authData.authorizationStatus
	);

	if (hasError) {
		return <ErrorScreen />;
	}

	return (
		<BrowserRouter>
			<Routes>
				<Route path={AppRouter.Main} element={<MainPage />} />
				<Route
					path={AppRouter.Login}
					element={
						<PublicRoute status={authStatus}>
							<LoginPage />
						</PublicRoute>
					}
				/>
				<Route
					path={AppRouter.Favorites}
					element={
						<PrivateRoute status={authStatus}>
							<FavoritesPage />
						</PrivateRoute>
					}
				/>

				<Route path={AppRouter.Offer} element={<OfferPage />} />
				<Route path={'*'} element={<NotFoundScreen />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
