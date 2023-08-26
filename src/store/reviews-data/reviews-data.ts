import { createSlice } from '@reduxjs/toolkit';
import { IReviewsItem } from '../../types/types';
import { fetchComments, postComment } from '../thunks/comments';
import { RequestStatus } from '../../constants';

const initialState: {
	reviews: IReviewsItem[];
	postCommentStatus: RequestStatus;
} = {
	reviews: [],
	postCommentStatus: RequestStatus.Idle,
};

export const reviewsData = createSlice({
	name: 'reviewsData',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(fetchComments.fulfilled, (state, action) => {
			state.reviews = action.payload;
		});
		builder.addCase(postComment.pending, (state) => {
			state.postCommentStatus = RequestStatus.Loading;
		});
		builder.addCase(postComment.rejected, (state) => {
			state.postCommentStatus = RequestStatus.Failed;
		});
		builder.addCase(postComment.fulfilled, (state) => {
			state.postCommentStatus = RequestStatus.Success;
		});
	},
});

export const reviewsActions = {
	...reviewsData.actions,
	fetchComments,
	postComment,
};
