import { createSlice } from '@reduxjs/toolkit';
import { CITIES } from '../../constants';
import { FullOffer, ICity } from '../../types/types';
import { fetchOffers, setActiveCity } from '../actions';
import data from '../../mocks/offers';

const initialState: {
	offers: FullOffer[];
	activeCity: ICity['name'];
} = {
	offers: data.mockOffers,
	activeCity: CITIES[0],
};

export const offersData = createSlice({
	name: 'offersData',
	initialState,
	reducers: {},
	extraReducers(builder) {
		builder
			.addCase(fetchOffers, (state, action) => {
				state.offers = action.payload;
			})
			.addCase(setActiveCity, (state, action) => {
				state.activeCity = action.payload;
			});
	},
});
