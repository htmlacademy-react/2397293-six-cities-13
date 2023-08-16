import { createSlice } from '@reduxjs/toolkit';
import { getNearbyOffers } from '../thunks/offers';
import { FullOffer } from '../../types/types';

const initialState: {
	nearbyOffers: FullOffer[];
} = {
	nearbyOffers: [],
};

export const nearbyData = createSlice({
	name: 'nearbyData',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(getNearbyOffers.fulfilled, (state, action) => {
			state.nearbyOffers = action.payload;
		});
	},
});

export const nearbyActions = { ...nearbyData.actions, getNearbyOffers };
