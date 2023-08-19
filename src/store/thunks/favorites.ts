import { createAsyncThunk } from '@reduxjs/toolkit';
import { FullOffer } from '../../types/types';
import { ThunkApi } from '../../types/state';
import { Endpoint } from '../../constants';

const fetchFavorites = createAsyncThunk<FullOffer[], undefined, ThunkApi>(
	'favorite/fetchAll',
	async (_arg, { extra: api }) => {
		const response = await api.get<FullOffer[]>(Endpoint.Favorites);
		return response.data;
	}
);

interface ChangeProps {
	offerId: string;
	status: 1 | 0;
}

interface ChangeResponse {
	offer: FullOffer;
	status: 1 | 0;
}

const changeFavorite = createAsyncThunk<ChangeResponse, ChangeProps, ThunkApi>(
	'favorite/change',
	async ({ offerId, status }, { extra: api }) => {
		const response = await api.post<FullOffer>(
			`${Endpoint.Favorites}/${offerId}/${status}`
		);
		return { offer: response.data, status };
	}
);

export { fetchFavorites, changeFavorite };
