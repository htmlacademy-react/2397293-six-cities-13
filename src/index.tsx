import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import { OtherData } from './constants';

const root = ReactDOM.createRoot(
	document.getElementById('root') as HTMLElement
);

root.render(
	<React.StrictMode>
		<App offersCount={OtherData.offersCount} />
	</React.StrictMode>
);
