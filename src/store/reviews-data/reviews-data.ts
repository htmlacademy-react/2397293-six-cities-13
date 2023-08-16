import { createSlice } from '@reduxjs/toolkit';
import { IReviewsItem } from '../../types/types';
import { fetchComments } from '../thunks/comments';

const initialState: {
	reviews: IReviewsItem[];
} = {
	reviews: [],
};

export const reviewsData = createSlice({
	name: 'reviewsData',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(fetchComments.fulfilled, (state, action) => {
			state.reviews = action.payload;
		});
	},
});

export const reviewsActions = { ...reviewsData.actions, fetchComments };
