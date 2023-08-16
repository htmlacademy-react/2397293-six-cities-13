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

export enum RequestStatus {
	Idle = 'IDLE',
	Loading = 'LOADING',
	Success = 'SUCCESS',
	Failed = 'FAILED',
}

export const Endpoint = {
	Login: '/login',
	Favorites: '/favorites',
	Offers: '/offers',
	Comments: '/comments',
	Logout: '/logout',
} as const;

export const FavoriteStatus = {
	AddFavorite: '1',
	DeleteFavorite: '0',
};

export const SortingTypes = {
	Popular: 'Popular',
	PriceToHigh: 'Price: low to high',
	PriceToLow: 'Price: high to low',
	Rating: 'Top rated first',
} as const;
