import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../hooks/useSelectors';
import { MAX_REVIEWS_COUNT, RequestStatus } from '../../../constants';
import { getRandomSlice } from '../../../utils/generate-random-number';
import { useEffect } from 'react';
import { getNearbyOffers, getOffer } from '../../../store/thunks/offers';
import { fetchComments } from '../../../store/thunks/comments';

export function useFullOffer() {
	const dispatch = useAppDispatch();
	const { id } = useParams();

	const fullOffer = useAppSelector((state) => state.offersData.offer);
	const offerReviews = useAppSelector((state) => state.reviewsData.reviews);
	const newReviews = offerReviews
		.slice()
		.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
		.slice(0, MAX_REVIEWS_COUNT);

	const nearby = useAppSelector((state) => state.nearbyData.nearbyOffers);
	const nearbyOffers = getRandomSlice(nearby, 3);

	const statusFetchingOffer = useAppSelector(
		(state) => state.offersData.statusFetchingOffer
	);
	const statusFetchingReviews = useAppSelector(
		(state) => state.reviewsData.statusFetchingReviews
	);
	const statusFetchingNearby = useAppSelector(
		(state) => state.nearbyData.statusFetchingNearby
	);

	const isDataLoading =
		!!(statusFetchingOffer === RequestStatus.Loading &&
		statusFetchingNearby === RequestStatus.Loading &&
		statusFetchingReviews === RequestStatus.Loading);
	const hasErrorOfferLoading =
		statusFetchingOffer === RequestStatus.Failed;

	useEffect(() => {
		dispatch(getOffer(id as string));
		dispatch(fetchComments(id as string));
		dispatch(getNearbyOffers(id as string));
	}, [dispatch, id]);

	return {
		fullOffer,
		offerReviews,
		newReviews,
		nearbyOffers,
		isDataLoading,
		hasErrorOfferLoading,
	};
}
