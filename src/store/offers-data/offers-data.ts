import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { CITIES } from '../../constants';
import { FullOffer, ICity, Sorting } from '../../types/types';
import data from '../../mocks/offers';

const initialState: {
	offers: FullOffer[];
	activeCity: ICity['name'];
	sorting: Sorting;
} = {
	offers: data.mockOffers,
	activeCity: CITIES[0],
	sorting: 'Popular',
};

const offersData = createSlice({
	name: 'offersData',
	initialState,
	reducers: {
		setSorting(state, action: PayloadAction<Sorting>) {
			state.sorting = action.payload;
		},
		fetchOffers(state, action: PayloadAction<FullOffer[]>) {
			state.offers = action.payload;
		},
		setActiveCity(state, action: PayloadAction<ICity['name']>) {
			state.activeCity = action.payload;
		},
	},
});

export const { setSorting, fetchOffers, setActiveCity } = offersData.actions;

export default offersData.reducer;
