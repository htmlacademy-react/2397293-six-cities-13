import { faker } from '@faker-js/faker';
import { CITIES, OFFER_TYPES, OtherData } from '../constants';
import { FullOffer, ILocation, IOffer } from '../types/types';

function mockLocation(): ILocation {
	return {
		latitude: faker.location.latitude(),
		longitude: faker.location.longitude(),
		zoom: faker.number.int({ min: 1, max: 16 }),
	};
}

function mockOffer(): IOffer {
	return {
		id: crypto.randomUUID(),
		title: faker.location.streetAddress(),
		type: faker.helpers.arrayElement(OFFER_TYPES),
		price: faker.number.int({ min: 100, max: 1000 }),
		city: {
			name: faker.helpers.arrayElement(CITIES),
			location: mockLocation(),
		},
		location: mockLocation(),
		isFavorite: faker.datatype.boolean(),
		isPremium: faker.datatype.boolean(),
		rating: faker.number.int({ min: 0, max: 5 }),
		previewImage: faker.image.urlLoremFlickr({ category: 'appartment' }),
	};
}

function mockFullOffer(): IOffer & FullOffer {
	return {
		...mockOffer(),
		description: faker.lorem.sentence({ min: 5, max: 25 }),
		bedrooms: faker.number.int({ min: 1, max: 10 }),
		goods: Array.from({ length: faker.number.int({ min: 1, max: 10 }) }, () =>
			faker.lorem.word()
		),
		host: {
			name: faker.internet.userName(),
			avatarUrl: faker.image.avatar(),
			isPro: true,
		},
		images: Array.from({ length: faker.number.int({ min: 1, max: 10 }) }, () =>
			faker.image.urlLoremFlickr({ category: 'appartment' })
		),
		maxAdults: faker.number.int({ min: 1, max: 10 }),
	};
}

const mockOffers = Array.from({ length: OtherData.offersCount }, mockFullOffer);
const nearPlacesList = Array.from({ length: 3 }, mockFullOffer);

const data = { mockOffers, nearPlacesList };

export default data;
