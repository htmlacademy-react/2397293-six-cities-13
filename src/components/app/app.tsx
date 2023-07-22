import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainPage from '../../pages/main/main';
import { AppRouter, AuthStatus } from '../../constants';
import LoginPage from '../../pages/login/login';
import FavoritesPage from '../../pages/favorites/favorites';
import OfferPage from '../../pages/offer/offer';
import NotFoundScreen from '../../pages/not-found-screen/not-found-screen';
import PrivateRoute from '../private-route/private-route';
import mockOffer from '../../mocks/offers';

interface AppProps {
	offersCount: number;
}

function App({ offersCount }: AppProps) {
	const offers = Array.from({ length: offersCount }, mockOffer);

	return (
		<BrowserRouter>
			<Routes>
				<Route
					path={AppRouter.Main}
					element={<MainPage offersCount={offersCount} offers={offers} />}
				/>
				<Route path={AppRouter.Login} element={<LoginPage />} />
				<Route
					path={AppRouter.Favorites}
					element={
						<PrivateRoute authStatus={AuthStatus.Auth}>
							<FavoritesPage offers={offers} />
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
