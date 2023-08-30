import { FormEvent, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/useSelectors';
import { toast } from 'react-hot-toast';
import { loginAction } from '../../store/thunks/auth';
import { RequestStatus } from '../../constants';
import classNames from 'classnames';
import CSS from './login.module.css';

const EMAIL_PATTERN = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
const PASSWORD_PATTERN = /^(?=.*[a-zA-Z])(?=.*\d).{2,}$/;

type LoginData = {
	email: string;
	password: string;
};

function LoginForm() {
	const dispatch = useAppDispatch();

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [isEmailTouched, setIsEmailTouched] = useState(false);
	const [isPasswordTouched, setIsPasswordTouched] = useState(false);

	const isEmailValid = EMAIL_PATTERN.test(email);
	const isPasswordValid = PASSWORD_PATTERN.test(password);
	const isValid = isEmailValid && isPasswordValid;

	const statusFetchingLogin = useAppSelector(
		(state) => state.authData.statusFetchingAuthData
	);

	useEffect(() => {
		setEmail('');
		setPassword('');
		setIsEmailTouched(false);
		setIsPasswordTouched(false);
	}, []);

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (!isValid) {
			return;
		}

		const data = {
			email: email,
			password: password,
		} as LoginData;

		toast.promise(dispatch(loginAction(data)).unwrap(), {
			error: <b>Failed to submit form. Please try again!</b>,
			loading: 'Loading...',
			success: <b>Success login!</b>,
		});
	};

	return (
		<form
			className="login__form form"
			action="#"
			method="post"
			onSubmit={handleSubmit}
		>
			<div className="login__input-wrapper form__input-wrapper">
				<label className="visually-hidden">E-mail</label>
				<input
					disabled={statusFetchingLogin === RequestStatus.Loading}
					className={classNames('login__input', 'form__input', {
						[CSS.fieldInvalid]: !isEmailValid && isEmailTouched,
					})}
					type="email"
					name="email"
					placeholder="Email"
					required
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					onBlur={() => {
						setIsEmailTouched(true);
					}}
				/>
				<p
					hidden={isEmailValid || !isEmailTouched}
					className={CSS['error-text']}
				>
					Введите валидный e-mail
				</p>
			</div>
			<div className="login__input-wrapper form__input-wrapper">
				<label className="visually-hidden">Password</label>
				<input
					disabled={statusFetchingLogin === RequestStatus.Loading}
					className={classNames('login__input', 'form__input', {
						[CSS.fieldInvalid]: !isPasswordValid && isPasswordTouched,
					})}
					type="password"
					name="password"
					placeholder="Password"
					title="Пароль должен содержать не менее одной буквы и цифры"
					required
					onChange={(e) => setPassword(e.target.value)}
					onBlur={() => setIsPasswordTouched(true)}
				/>
				<p
					hidden={isPasswordValid || !isPasswordTouched}
					className={CSS['error-text']}
				>
					Введите не менее одной буквы и цифры
				</p>
			</div>
			<button
				className="login__submit form__submit button"
				type="submit"
				disabled={statusFetchingLogin === RequestStatus.Loading}
			>
				Sign in
			</button>
		</form>
	);
}

export default LoginForm;
