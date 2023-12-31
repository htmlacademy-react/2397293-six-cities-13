import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import { Provider } from 'react-redux';
import { store } from './store';
import { checkAuth } from './store/thunks/auth';
import { Toaster } from 'react-hot-toast';

store.dispatch(checkAuth());

const root = ReactDOM.createRoot(
	document.getElementById('root') as HTMLElement
);

root.render(
	<React.StrictMode>
		<Provider store={store}>
			<App />
		</Provider>
		<Toaster position="top-center" />
	</React.StrictMode>
);
