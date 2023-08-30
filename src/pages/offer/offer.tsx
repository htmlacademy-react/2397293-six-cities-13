import FormForReview from '../../components/form-for-review/form-for-review';
import Header from '../../components/header/header';
import ReviewsList from '../../components/reviews-list/reviews-list';
import { useDocumentTitle } from '../../hooks/document-title';
import Map from '../../components/map/map';
import { FullOffer } from '../../types/types';
import { useCallback, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/useSelectors';
import { AuthStatus } from '../../constants';
import { ClipLoader } from 'react-spinners';
import NotFoundScreen from '../not-found-screen/not-found-screen';
import FavoriteButton from '../../components/favorite-button/favorite-button';
import classNames from 'classnames';
import { useFullOffer } from './hooks/use-full-offer';
import { offersActions } from '../../store/offers-data/offers-data';
import { capitalizeFirstLetter } from '../../utils/get-offers-by-city';
import Card from '../../components/card/card';

function OfferPage() {
	useDocumentTitle('OfferPage');

	const dispatch = useAppDispatch();
	const authStatus = useAppSelector(
		(state) => state.authData.authorizationStatus
	);

	const {
		fullOffer,
		offerReviews,
		newReviews,
		nearbyOffers,
		isDataLoading,
		hasErrorOfferLoading,
	} = useFullOffer();

	useEffect(() => {
		if (fullOffer) {
			dispatch(offersActions.setActiveOffer(fullOffer));
		}

		return () => {
			dispatch(offersActions.setActiveOffer(null));
		};
	}, [fullOffer, dispatch]);

	const handleActiveOfferChange = useCallback(
		(offer: FullOffer | null) => {
			if (!offer) {
				dispatch(offersActions.setActiveOffer(fullOffer));
			} else {
				dispatch(offersActions.setActiveOffer(offer));
			}
		},
		[dispatch, fullOffer]
	);

	if (isDataLoading) {
		return (
			<div className="page">
				<Header withNavigation />
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
			</div>
		);
	}

	if (hasErrorOfferLoading) {
		return <NotFoundScreen />;
	}

	return (
		<div className="page">
			<Header withNavigation />
			<main className="page__main page__main--offer">
				<section className="offer">
					<div className="offer__gallery-container container">
						<div className="offer__gallery">
							{fullOffer?.images.map((image) => (
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
							{fullOffer?.isPremium && (
								<div className="offer__mark">
									<span>Premium</span>
								</div>
							)}

							<div className="offer__name-wrapper">
								<h1 className="offer__name">{fullOffer?.title}</h1>
								{fullOffer && (
									<FavoriteButton
										bemClassTitle="offer"
										isFavorite={fullOffer?.isFavorite}
										offerId={fullOffer?.id}
										width={31}
									/>
								)}
							</div>
							{fullOffer?.rating && (
								<div className="offer__rating rating">
									<div className="offer__stars rating__stars">
										<span
											style={{ width: `${fullOffer.rating * 20.45}%` }}
										>
										</span>
										<span className="visually-hidden">Rating</span>
									</div>
									<span className="offer__rating-value rating__value">
										{fullOffer.rating}
									</span>
								</div>
							)}

							<ul className="offer__features">
								{fullOffer && (
									<li className="offer__feature offer__feature--entire">
										{capitalizeFirstLetter(fullOffer.type)}
									</li>
								)}
								<li className="offer__feature offer__feature--bedrooms">
									{fullOffer?.bedrooms}{' '}
									{fullOffer?.bedrooms === 1 ? 'Bedroom' : 'Bedrooms'}
								</li>
								<li className="offer__feature offer__feature--adults">
									Max {fullOffer?.maxAdults}{' '}
									{fullOffer?.maxAdults === 1 ? 'adult' : 'adults'}
								</li>
							</ul>
							<div className="offer__price">
								<b className="offer__price-value">&euro;{fullOffer?.price}</b>
								<span className="offer__price-text">&nbsp;night</span>
							</div>
							<div className="offer__inside">
								<h2 className="offer__inside-title">What&apos;s inside</h2>
								<ul className="offer__inside-list">
									{fullOffer?.goods.map((item) => (
										<li className="offer__inside-item" key={item}>
											{item}
										</li>
									))}
								</ul>
							</div>
							<div className="offer__host">
								<h2 className="offer__host-title">Meet the host</h2>
								<div className="offer__host-user user">
									<div
										className={classNames(
											'offer__avatar-wrapper',
											{ ' offer__avatar-wrapper--pro': fullOffer?.host.isPro },
											'user__avatar-wrapper'
										)}
									>
										<img
											className="offer__avatar user__avatar"
											src={fullOffer?.host.avatarUrl}
											width={74}
											height={74}
											alt="Host avatar"
										/>
									</div>
									<span className="offer__user-name">
										{fullOffer?.host.name}
									</span>
									{fullOffer?.host.isPro && (
										<span className="offer__user-status">Pro</span>
									)}
								</div>
								<div className="offer__description">
									<p className="offer__text">{fullOffer?.description}</p>
								</div>
							</div>
							<section className="offer__reviews reviews">
								<h2 className="reviews__title">
									Reviews &middot;{' '}
									<span className="reviews__amount">{offerReviews.length}</span>
								</h2>
								<ReviewsList offerReviews={newReviews} />
								{authStatus === AuthStatus.Auth && fullOffer?.id && (
									<FormForReview offerId={fullOffer.id} />
								)}
							</section>
						</div>
					</div>
					{fullOffer && (
						<Map
							city={fullOffer.city}
							points={[...nearbyOffers, fullOffer]}
							titleByClassName="offer"
						/>
					)}
				</section>
				<div className="container">
					<section className="near-places places">
						<h2 className="near-places__title">
							Other places in the neighborhood
						</h2>
						<div className="near-places__list places__list">
							{nearbyOffers.map((offer) => (
								<Card
									bemClassTitle={'near-places'}
									{...offer}
									key={offer.id}
									onMouseEnter={() => handleActiveOfferChange(offer)}
									onMouseLeave={() => handleActiveOfferChange(null)}
								/>
							))}
						</div>
					</section>
				</div>
			</main>
		</div>
	);
}

export default OfferPage;
