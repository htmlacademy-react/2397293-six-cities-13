import { createSlice } from '@reduxjs/toolkit';
import { FullOffer } from '../../types/types';
import { fetchFavorites } from '../thunks/favorites';
import { RequestStatus } from '../../constants';

const initialState: {
	favorites: FullOffer[];
	status: RequestStatus;
} = {
	favorites: [],
	status: RequestStatus.Idle,
};

export const favoritesData = createSlice({
	name: 'favoritesData',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(fetchFavorites.fulfilled, (state, action) => {
			state.favorites = action.payload;
			state.status = RequestStatus.Success;
		});
		builder.addCase(fetchFavorites.pending, (state) => {
			state.status = RequestStatus.Loading;
		});
		builder.addCase(fetchFavorites.rejected, (state) => {
			state.status = RequestStatus.Failed;
		});
	},
});

export const favoritesActions = { ...favoritesData.actions, fetchFavorites };
