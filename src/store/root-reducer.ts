import { combineReducers } from '@reduxjs/toolkit';
import { offersData } from './offers-data/offers-data';

export const rootReducer = combineReducers({
	offersData: offersData.reducer,
});
