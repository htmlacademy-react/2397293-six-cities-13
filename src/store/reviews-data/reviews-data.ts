import { createSlice } from '@reduxjs/toolkit';
import { IReviewsItem } from '../../types/types';
import { fetchComments, postComment } from '../thunks/comments';
import { RequestStatus } from '../../constants';

const initialState: {
	reviews: IReviewsItem[];
	postCommentStatus: RequestStatus;
	statusFetchingReviews: RequestStatus;
} = {
	reviews: [],
	postCommentStatus: RequestStatus.Idle,
	statusFetchingReviews: RequestStatus.Idle,
};

export const reviewsData = createSlice({
	name: 'reviewsData',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(fetchComments.fulfilled, (state, action) => {
			state.reviews = action.payload;
			state.statusFetchingReviews = RequestStatus.Success;
		});
		builder.addCase(fetchComments.pending, (state) => {
			state.statusFetchingReviews = RequestStatus.Loading;
		});
		builder.addCase(fetchComments.rejected, (state) => {
			state.statusFetchingReviews = RequestStatus.Failed;
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
