import { createSlice } from '@reduxjs/toolkit';
import { getNearbyOffers } from '../thunks/offers';
import { FullOffer } from '../../types/types';
import { RequestStatus } from '../../constants';

const initialState: {
	nearbyOffers: FullOffer[];
	statusFetchingNearby: RequestStatus;
} = {
	nearbyOffers: [],
	statusFetchingNearby: RequestStatus.Idle,
};

export const nearbyData = createSlice({
	name: 'nearbyData',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(getNearbyOffers.fulfilled, (state, action) => {
			state.nearbyOffers = action.payload;
		});
		builder.addCase(getNearbyOffers.pending, (state) => {
			state.statusFetchingNearby = RequestStatus.Loading;
		});
		builder.addCase(getNearbyOffers.rejected, (state) => {
			state.statusFetchingNearby = RequestStatus.Failed;
		});
	},
});

export const nearbyActions = { ...nearbyData.actions, getNearbyOffers };
