import { combineReducers } from '@reduxjs/toolkit';
import { offersData } from './offers-data/offers-data';
import { reviewsData } from './reviews-data/reviews-data';
import { nearbyData } from './nearby-data/nearby-data';

export const rootReducer = combineReducers({
	[offersData.name]: offersData.reducer,
	[reviewsData.name]: reviewsData.reducer,
	[nearbyData.name]: nearbyData.reducer,
});
