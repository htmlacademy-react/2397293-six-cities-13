import { createAction } from '@reduxjs/toolkit';
import { FullOffer, ICity } from '../types/types';

export const setActiveCity = createAction<ICity['name']>(
	'offersData/setActiveCity'
);
export const fetchOffers = createAction<FullOffer[]>('offersData/fetchOffers');
