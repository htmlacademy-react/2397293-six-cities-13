import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainPage from '../../pages/main/main';
import { AppRouter } from '../../constants';
import LoginPage from '../../pages/login/login';
import FavoritesPage from '../../pages/favorites/favorites';
import OfferPage from '../../pages/offer/offer';
import NotFoundScreen from '../../pages/not-found-screen/not-found-screen';
import PrivateRoute from '../private-route/private-route';

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path={AppRouter.Main} element={<MainPage />} />
				<Route path={AppRouter.Login} element={<LoginPage />} />
				<Route
					path={AppRouter.Favorites}
					element={
						<PrivateRoute>
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
