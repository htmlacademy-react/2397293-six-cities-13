import { FullOffer } from '../types/types';

function capitalizeFirstLetter(str: string) {
	return str.charAt(0).toUpperCase() + str.slice(1);
}

function getOffersByCity(offers: FullOffer[]) {
	const offersByCity: Record<string, FullOffer[]> = {};

	for (const offer of offers) {
		const city = offer.city.name;

		if (city in offersByCity) {
			offersByCity[city].push(offer);
			continue;
		}
		offersByCity[city] = [offer];
		continue;
	}

	return offersByCity;
}

function getFavoriteOffersByCity(offers: FullOffer[]) {
	const offersByCity: Record<string, FullOffer[]> = {};

	for (const offer of offers) {
		if (offer.isFavorite) {
			const city = offer.city.name;

			if (city in offersByCity) {
				offersByCity[city].push(offer);
				continue;
			}
			offersByCity[city] = [offer];
			continue;
		}
	}

	return offersByCity;
}

export { capitalizeFirstLetter, getOffersByCity, getFavoriteOffersByCity };
