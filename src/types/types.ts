export interface ILocation {
	latitude: number;
	longitude: number;
	zoom: number;
}

export interface ICity {
	name: string;
	location: ILocation;
}

export interface IOffer {
	id: string;
	title: string;
	type: string;
	price: number;
	city: ICity;
	location: ILocation;
	isFavorite: boolean;
	isPremium: boolean;
	rating: number;
	previewImage: string;
}

export interface IUser {
	name: string;
	avatarUrl: string;
	isPro: boolean;
}

export interface IReviewsItem {
	id: string;
	comment: string;
	date: string;
	rating: number;
	user: IUser;
}

export type FullOffer = Omit<IOffer, 'previewImage'> & {
	description: string;
	bedrooms: number;
	goods: string[];
	host: {
		name: string;
		avatarUrl: string;
		isPro: boolean;
	};
	images: string[];
	maxAdults: number;
};
