import MainPage from '../../pages/main/main';

interface AppProps {
	offersCount: number;
}

function App({ offersCount }: AppProps) {
	return <MainPage offersCount={offersCount} />;
}

export default App;
