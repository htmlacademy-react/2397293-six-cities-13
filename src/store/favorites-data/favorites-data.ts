import { createSlice } from '@reduxjs/toolkit';
import { FullOffer } from '../../types/types';
import { fetchFavorites } from '../thunks/favorites';

const initialState: {
	favorites: FullOffer[];
} = {
	favorites: [],
};

export const favoritesData = createSlice({
	name: 'favoritesData',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(fetchFavorites.fulfilled, (state, action) => {
			state.favorites = action.payload;
		});
	},
});

export const favoritesActions = { ...favoritesData.actions, fetchFavorites };
