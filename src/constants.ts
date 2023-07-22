export const PROJECT_NAME = '6 cities';

export const OtherData = {
	offersCount: 5,
} as const;

export const CITIES = [
	'Paris',
	'Cologne',
	'Brussels',
	'Amsterdam',
	'Hamburg',
	'Dusseldorf',
] as const;

export const OFFER_TYPES = [
	'Apartment',
	'Private room',
	'Villa',
	'Hotel',
] as const;

export const AppRouter = {
	Main: '/',
	Login: '/login',
	Favorites: '/favorites',
	Offer: '/offer/:id',
} as const;

export enum AuthStatus {
	Auth = 'AUTH',
	NotAuth = 'NOT_AUTH',
	Unknown = 'UNKNOWN',
}
