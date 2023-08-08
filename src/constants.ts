export const PROJECT_NAME = '6 cities';

export const URL_MARKER_DEFAULT = '/img/pin.svg';

export const URL_MARKER_CURRENT = '/img/pin-active.svg';

export const OtherData = {
	offersCount: 10,
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
