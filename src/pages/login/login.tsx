import { Link, useNavigate } from 'react-router-dom';
import { AppRouter, AuthStatus, RequestStatus } from '../../constants';
import { useDocumentTitle } from '../../hooks/document-title';
import { FormEvent, useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/useSelectors';
import { loginAction } from '../../store/thunks/auth';
import Header from '../../components/header/header';
import { toast } from 'react-hot-toast';

function LoginPage() {
	useDocumentTitle('Login');

	const loginRef = useRef<HTMLInputElement | null>(null);
	const passwordRef = useRef<HTMLInputElement | null>(null);

	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const statusFetchingLogin = useAppSelector(
		(state) => state.authData.statusFetchingAuthData
	);
	const authStatus = useAppSelector(
		(state) => state.authData.authorizationStatus
	);

	useEffect(() => {
		if (authStatus === AuthStatus.Auth) {
			navigate(AppRouter.Main);
		}
	}, [authStatus, navigate]);

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (loginRef.current !== null && passwordRef.current !== null) {
			toast.promise(
				dispatch(
					loginAction({
						email: loginRef.current.value,
						password: passwordRef.current.value,
					})
				).unwrap(),
				{
					error: <b>Failed.</b>,
					loading: 'Loading...',
					success: <b>Success login!</b>,
				}
			);
		}
	};

	return (
		<div className="page page--gray page--login">
			<Header withNavigation={false} />

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
