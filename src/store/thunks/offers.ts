import { createAsyncThunk } from '@reduxjs/toolkit';
import { FullOffer } from '../../types/types';
import { ThunkApi } from '../../types/state';
import { Endpoint } from '../../constants';

const getAllOffers = createAsyncThunk<FullOffer[], undefined, ThunkApi>(
	'offers/getAll',
	async (_arg, { extra: api }) => {
		const response = await api.get<FullOffer[]>(Endpoint.Offers);
		return response.data;
	}
);

const getOffer = createAsyncThunk<FullOffer, string, ThunkApi>(
	'offers/getOffer',
	async (offerId, { extra: api }) => {
		const response = await api.get<FullOffer>(`${Endpoint.Offers}/${offerId}`);
		return response.data;
	}
);

const getNearbyOffers = createAsyncThunk<FullOffer[], string, ThunkApi>(
	'offers/nerbyOffers',
	async (offerId, { extra: api }) => {
		const response = await api.get<FullOffer[]>(
			`${Endpoint.Offers}/${offerId}/nearby`
		);
		return response.data;
	}
);

export { getAllOffers, getOffer, getNearbyOffers };
