import React from 'react';
import MainPage from '../../pages/main/main';

interface AppProps {
	offersCount: number;
}

const App: React.FC<AppProps> = ({ offersCount }) => {
	return <MainPage offersCount={offersCount} />;
};

export default App;
