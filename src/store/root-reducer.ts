import { combineReducers } from '@reduxjs/toolkit';
import offersDataReducer from './offers-data/offers-data';

export const rootReducer = combineReducers({
	offersData: offersDataReducer,
});
