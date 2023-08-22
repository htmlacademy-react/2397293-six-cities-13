import { Link, useNavigate } from 'react-router-dom';
import { AppRouter, RequestStatus } from '../../constants';
import { useDocumentTitle } from '../../hooks/document-title';
import { FormEvent, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/useSelectors';
import { loginAction } from '../../store/thunks/auth';

function LoginPage() {
	useDocumentTitle('Login');

	const loginRef = useRef<HTMLInputElement | null>(null);
	const passwordRef = useRef<HTMLInputElement | null>(null);

	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const statusFetchingLogin = useAppSelector(
		(state) => state.authData.statusFetchingAuthData
	);

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (loginRef.current !== null && passwordRef.current !== null) {
			dispatch(
				loginAction({
					email: loginRef.current.value,
					password: passwordRef.current.value,
				})
			).then((response) => {
				if (response.meta.requestStatus === 'fulfilled') {
					navigate(AppRouter.Main);
					loginRef.current = null;
					passwordRef.current = null;
				}
			});
		}
	};

	return (
		<div className="page page--gray page--login">
			<header className="header">
				<div className="container">
					<div className="header__wrapper">
						<div className="header__left">
							<Link className="header__logo-link" to={AppRouter.Main}>
								<img
									className="header__logo"
									src="img/logo.svg"
									alt="6 cities logo"
									width={81}
									height={41}
								/>
							</Link>
						</div>
					</div>
				</div>
			</header>

			<main className="page__main page__main--login">
				<div className="page__login-container container">
					<section className="login">
						<h1 className="login__title">Sign in</h1>
						<form
							className="login__form form"
							action="#"
							method="post"
							onSubmit={handleSubmit}
						>
							<div className="login__input-wrapper form__input-wrapper">
								<label className="visually-hidden">E-mail</label>
								<input
									ref={loginRef}
									disabled={statusFetchingLogin === RequestStatus.Loading}
									className="login__input form__input"
									type="email"
									name="email"
									placeholder="Email"
									required
								/>
							</div>
							<div className="login__input-wrapper form__input-wrapper">
								<label className="visually-hidden">Password</label>
								<input
									ref={passwordRef}
									disabled={statusFetchingLogin === RequestStatus.Loading}
									className="login__input form__input"
									type="password"
									name="password"
									placeholder="Password"
									required
								/>
							</div>
							<button
								className="login__submit form__submit button"
								type="submit"
								disabled={statusFetchingLogin === RequestStatus.Loading}
							>
								Sign in
							</button>
						</form>
					</section>
					<section className="locations locations--login locations--current">
						<div className="locations__item">
							<Link className="locations__item-link" to={AppRouter.Main}>
								<span>Amsterdam</span>
							</Link>
						</div>
					</section>
				</div>
			</main>
		</div>
	);
}

export default LoginPage;
