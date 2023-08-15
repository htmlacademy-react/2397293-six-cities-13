import { FullOffer, Sorting } from '../types/types';

function sortPriceToHigh(a: FullOffer, b: FullOffer) {
	return a.price - b.price;
}

function sortPriceToLow(a: FullOffer, b: FullOffer) {
	return b.price - a.price;
}

function sortByRating(a: FullOffer, b: FullOffer) {
	return b.rating - a.rating;
}

export const sortingHelper: Record<
	Sorting,
	(offers: FullOffer[]) => FullOffer[]
> = {
	Popular: (offers: FullOffer[]) => offers.slice(),
	PriceToHigh: (offers: FullOffer[]) => offers.slice().sort(sortPriceToHigh),
	PriceToLow: (offers: FullOffer[]) => offers.slice().sort(sortPriceToLow),
	Rating: (offers: FullOffer[]) => offers.slice().sort(sortByRating),
};
