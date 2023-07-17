export const PROJECT_NAME = '6 cities';

export enum AppRouter {
	Main = '/',
	Login = '/login',
	Favorites = '/favorites',
	Offer = '/offer/:id',
}

export enum AuthStatus {
	Auth = 'AUTH',
	NotAuth = 'NOT_AUTH',
	Unknown = 'UNKNOWN',
}
