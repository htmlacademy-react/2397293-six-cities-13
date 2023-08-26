import FormForReview from '../../components/form-for-review/form-for-review';
import Header from '../../components/header/header';
import NearPlacesList from '../../components/near-places-list/near-places-list';
import ReviewsList from '../../components/reviews-list/reviews-list';
import { useDocumentTitle } from '../../hooks/document-title';
import Map from '../../components/map/map';
import { FullOffer } from '../../types/types';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/useSelectors';
import { fetchComments } from '../../store/thunks/comments';
import { AuthStatus, RequestStatus } from '../../constants';
import { ClipLoader } from 'react-spinners';
import { getNearbyOffers, getOffer } from '../../store/thunks/offers';
import { getRandomSlice } from '../../utils/generate-random-number';
import NotFoundScreen from '../not-found-screen/not-found-screen';
import FavoriteButton from '../../components/favorite-button/favorite-button';

function OfferPage() {
	useDocumentTitle('OfferPage');

	const { id } = useParams();
	const dispatch = useAppDispatch();

	const offerById = useAppSelector((state) => state.offersData.offer);
	const statusFetchingOffer = useAppSelector(
		(state) => state.offersData.statusFetchingOffer
	);
	const offerReviews = useAppSelector((state) => state.reviewsData.reviews);
	const nearPlacesList = useAppSelector(
		(state) => state.nearbyData.nearbyOffers
	);
	const authStatus = useAppSelector(
		(state) => state.authData.authorizationStatus
	);

	const [randomNearbyOffers, setRandomNearbyOffers] = useState<FullOffer[]>([]);
	const [selectNearPlace, setSelectNearPlace] = useState<FullOffer | undefined>(
		undefined
	);

	const [errorId, setErrorId] = useState(false);

	useEffect(() => {
		if (id) {
			dispatch(getOffer(id)).then((res) => {
				if (res.meta.requestStatus === 'rejected') {
					setErrorId(true);
				} else {
					setErrorId(false);
				}
			});
			dispatch(fetchComments(id));
			dispatch(getNearbyOffers(id));
		}
	}, [id, dispatch]);

	useEffect(() => {
		if (nearPlacesList.length) {
			const randomNearby = getRandomSlice(nearPlacesList, 3);
			setRandomNearbyOffers(randomNearby);
		}
	}, [nearPlacesList]);

	if (errorId) {
		return <NotFoundScreen />;
	}

	return (
		<div className="page">
			<Header withNavigation />
			{statusFetchingOffer === RequestStatus.Loading ? (
				<div
					style={{
						width: '100%',
						height: '100vh',
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
					}}
				>
					<ClipLoader color="#378dcc" size={40} />
				</div>
			) : (
				<main className="page__main page__main--offer">
					<section className="offer">
						<div className="offer__gallery-container container">
							<div className="offer__gallery">
								{offerById?.images.map((image) => (
									<div className="offer__image-wrapper" key={image}>
										<img
											className="offer__image"
											src={image}
											alt="Photo studio"
										/>
									</div>
								))}
							</div>
						</div>
						<div className="offer__container container">
							<div className="offer__wrapper">
								{offerById?.isPremium && (
									<div className="offer__mark">
										<span>Premium</span>
									</div>
								)}

								<div className="offer__name-wrapper">
									<h1 className="offer__name">{offerById?.title}</h1>
									{offerById && (
										<FavoriteButton
											bemClassTitle="offer"
											isFavorite={offerById?.isFavorite}
											offerId={offerById?.id}
											width={31}
										/>
									)}
								</div>
								{offerById?.rating && (
									<div className="offer__rating rating">
										<div className="offer__stars rating__stars">
											<span
												style={{ width: `${offerById?.rating * 20}%` }}
											>
											</span>
											<span className="visually-hidden">Rating</span>
										</div>
										<span className="offer__rating-value rating__value">
											{offerById?.rating}
										</span>
									</div>
								)}

								<ul className="offer__features">
									{offerById && (
										<li className="offer__feature offer__feature--entire">
											{offerById?.type[0].toUpperCase() +
												offerById?.type.slice(1)}
										</li>
									)}
									<li className="offer__feature offer__feature--bedrooms">
										{offerById?.bedrooms}{' '}
										{offerById?.bedrooms === 1 ? 'Bedroom' : 'Bedrooms'}
									</li>
									<li className="offer__feature offer__feature--adults">
										Max {offerById?.maxAdults}{' '}
										{offerById?.maxAdults === 1 ? 'adult' : 'adults'}
									</li>
								</ul>
								<div className="offer__price">
									<b className="offer__price-value">&euro;{offerById?.price}</b>
									<span className="offer__price-text">&nbsp;night</span>
								</div>
								<div className="offer__inside">
									<h2 className="offer__inside-title">What&apos;s inside</h2>
									<ul className="offer__inside-list">
										{offerById?.goods.map((item) => (
											<li className="offer__inside-item" key={item}>
												{item}
											</li>
										))}
									</ul>
								</div>
								<div className="offer__host">
									<h2 className="offer__host-title">Meet the host</h2>
									<div className="offer__host-user user">
										<div className="offer__avatar-wrapper offer__avatar-wrapper--pro user__avatar-wrapper">
											<img
												className="offer__avatar user__avatar"
												src={offerById?.host.avatarUrl}
												width={74}
												height={74}
												alt="Host avatar"
											/>
										</div>
										<span className="offer__user-name">
											{offerById?.host.name}
										</span>
										{offerById?.host.isPro && (
											<span className="offer__user-status">Pro</span>
										)}
									</div>
									<div className="offer__description">
										<p className="offer__text">{offerById?.description}</p>
									</div>
								</div>
								<section className="offer__reviews reviews">
									<h2 className="reviews__title">
										Reviews &middot;{' '}
										<span className="reviews__amount">
											{offerReviews.length}
										</span>
									</h2>
									<ReviewsList offerReviews={offerReviews} />
									{authStatus === AuthStatus.Auth && id && (
										<FormForReview offerId={id} />
									)}
								</section>
							</div>
							<Map
								city={randomNearbyOffers[0]?.city}
								points={randomNearbyOffers}
								selectOffer={selectNearPlace}
								titleByClassName="offer"
							/>
						</div>
					</section>
					<div className="container">
						<section className="near-places places">
							<h2 className="near-places__title">
								Other places in the neighbourhood
							</h2>
							<NearPlacesList
								nearPlaces={randomNearbyOffers}
								onSelectNearPlace={setSelectNearPlace}
							/>
						</section>
					</div>
				</main>
			)}
		</div>
	);
}

export default OfferPage;
