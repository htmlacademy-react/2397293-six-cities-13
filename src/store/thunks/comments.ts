import { createAsyncThunk } from '@reduxjs/toolkit';
import { FullOffer, IReviewsItem } from '../../types/types';
import { ThunkApi } from '../../types/state';
import { Endpoint } from '../../constants';

const fetchComments = createAsyncThunk<
	IReviewsItem[],
	FullOffer['id'],
	ThunkApi
>('comments/fetch', async (offerId, { extra: api }) => {
	const response = await api.get<IReviewsItem[]>(
		`${Endpoint.Comments}/${offerId}`
	);
	return response.data;
});

interface PostCommentProps {
	body: {
		comment: string;
		rating: number;
	};
	offerId: FullOffer['id'];
}

const postComment = createAsyncThunk<IReviewsItem, PostCommentProps, ThunkApi>(
	'comment/post',
	async ({ body, offerId }, { extra: api }) => {
		const response = await api.post<IReviewsItem>(
			`${Endpoint.Comments}/${offerId}`,
			body
		);
		return response.data;
	}
);

export { fetchComments, postComment };
