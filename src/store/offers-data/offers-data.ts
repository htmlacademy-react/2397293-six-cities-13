import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { CITIES, RequestStatus } from '../../constants';
import { FullOffer, ICity, Sorting } from '../../types/types';
import { getAllOffers, getOffer } from '../thunks/offers';

const initialState: {
	offers: FullOffer[];
	offer: FullOffer | null;
	activeOffer: FullOffer | null;
	statusFetchingAllOffers: RequestStatus;
	statusFetchingOffer: RequestStatus;
	hasErrorOfferLoading: boolean;
	activeCity: ICity['name'];
	sorting: Sorting;
} = {
	offers: [],
	offer: null,
	activeOffer: null,
	statusFetchingAllOffers: RequestStatus.Idle,
	statusFetchingOffer: RequestStatus.Idle,
	hasErrorOfferLoading: false,
	activeCity: CITIES[0],
	sorting: 'Popular',
};

export const offersData = createSlice({
	name: 'offersData',
	initialState,
	reducers: {
		setSorting(state, action: PayloadAction<Sorting>) {
			state.sorting = action.payload;
		},
		setActiveCity(state, action: PayloadAction<ICity['name']>) {
			state.activeCity = action.payload;
		},
		setActiveOffer(state, action: PayloadAction<FullOffer | null>) {
			state.activeOffer = action.payload;
		},
		clearOffers(state) {
			state.offers = [];
		},
	},
	extraReducers: (builder) => {
		builder.addCase(getAllOffers.fulfilled, (state, action) => {
			state.offers = action.payload;
			state.statusFetchingAllOffers = RequestStatus.Success;
			state.hasErrorOfferLoading = false;
		});
		builder.addCase(getAllOffers.rejected, (state) => {
			state.statusFetchingAllOffers = RequestStatus.Failed;
			state.hasErrorOfferLoading = true;
		});
		builder.addCase(getAllOffers.pending, (state) => {
			state.statusFetchingAllOffers = RequestStatus.Loading;
			state.hasErrorOfferLoading = false;
		});
		builder.addCase(getOffer.fulfilled, (state, action) => {
			state.offer = action.payload;
			state.statusFetchingOffer = RequestStatus.Success;
		});
		builder.addCase(getOffer.rejected, (state) => {
			state.statusFetchingOffer = RequestStatus.Failed;
		});
		builder.addCase(getOffer.pending, (state) => {
			state.statusFetchingOffer = RequestStatus.Loading;
		});
	},
});

export const offersActions = { ...offersData.actions, getAllOffers, getOffer };
