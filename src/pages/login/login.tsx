import { useDocumentTitle } from '../../hooks/document-title';
import Header from '../../components/header/header';
import RandomCity from '../../components/random-city/random-city';
import LoginForm from '../../components/login-form/login-form';

function LoginPage() {
	useDocumentTitle('Login');

	return (
		<div className="page page--gray page--login">
			<Header withNavigation={false} />

			<main className="page__main page__main--login">
				<div className="page__login-container container">
					<section className="login">
						<h1 className="login__title">Sign in</h1>
						<LoginForm />
					</section>
					<section className="locations locations--login locations--current">
						<RandomCity />
					</section>
				</div>
			</main>
		</div>
	);
}

export default LoginPage;
