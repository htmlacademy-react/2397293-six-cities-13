export interface ILocation {
	latitude: number;
	longitude: number;
	zoom: number;
}

export interface IOffer {
	id: string;
	title: string;
	type: string;
	price: number;
	city: {
		name: string;
		location: ILocation;
	};
	location: ILocation;
	isFavorite: boolean;
	isPremium: boolean;
	rating: number;
	previewImage: string;
}

export interface ICity {
	title: string;
	lat: number;
	lng: number;
	zoom: number;
}

export interface IPoint {
	title: string;
	lat: number;
	lng: number;
}
