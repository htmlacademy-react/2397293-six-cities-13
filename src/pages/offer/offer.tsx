import FormForReview from '../../components/form-for-review/form-for-review';
import Header from '../../components/header/header';
import NearPlacesList from '../../components/near-places-list/near-places-list';
import ReviewsList from '../../components/reviews-list/reviews-list';
import { useDocumentTitle } from '../../hooks/document-title';
import Map from '../../components/map/map';
import { FullOffer } from '../../types/types';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import classNames from 'classnames';
import { useAppDispatch, useAppSelector } from '../../hooks/useSelectors';
import { getNearbyOffers, getOffer } from '../../store/thunks/offers';
import { fetchComments } from '../../store/thunks/comments';
import { RequestStatus } from '../../constants';
import { ClipLoader } from 'react-spinners';
import { getRandomSlice } from '../../utils/generate-random-number';

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

	const [randomNearbyOffers, setRandomNearbyOffers] = useState<FullOffer[]>([]);
	const [selectNearPlace, setSelectNearPlace] = useState<FullOffer | undefined>(
		undefined
	);

	useEffect(() => {
		if (id) {
			dispatch(getOffer(id));
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

	const bookmarkClassName = classNames('offer__bookmark-button', 'button', {
		'offer__bookmark-button--active': offerById?.isFavorite,
	});
	const bookmarkLabel = `${offerById?.isFavorite ? 'In' : 'To'} bookmarks`;

	return (
		<div className="page">
			<Header />
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
									<button className={bookmarkClassName} type="button">
										<svg
											className="offer__bookmark-icon"
											width="31"
											height="33"
										>
											<use href="#icon-bookmark"></use>
										</svg>
										<span className="visually-hidden">{bookmarkLabel}</span>
									</button>
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
									<li className="offer__feature offer__feature--entire">
										{offerById?.type}
									</li>
									<li className="offer__feature offer__feature--bedrooms">
										{offerById?.bedrooms} Bedrooms
									</li>
									<li className="offer__feature offer__feature--adults">
										Max {offerById?.maxAdults} adults
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
									<FormForReview />
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
