import { IReviewsItem } from '../../types/types';

interface ReviewsItemProps {
	reviewData: IReviewsItem;
}

function ReviewsItem({ reviewData }: ReviewsItemProps) {
	const dateConvert = (value: string) => {
		let createBody;
		if (value) {
			const date = new Date(value);
			const day = String(date.getDate()).padStart(2, '0');
			const month = String(date.getMonth() + 1).padStart(2, '0');
			const year = date.getFullYear();
			const data = `${year}-${month}-${day}`;
			createBody = data;
		}
		return createBody;
	};

	return (
		<li className="reviews__item">
			<div className="reviews__user user">
				<div className="reviews__avatar-wrapper user__avatar-wrapper">
					<img
						className="reviews__avatar user__avatar"
						src={reviewData.user.avatarUrl}
						width={54}
						height={54}
						alt="Reviews avatar"
					/>
				</div>
				<span className="reviews__user-name">{reviewData.user.name}</span>
			</div>
			<div className="reviews__info">
				<div className="reviews__rating rating">
					<div className="reviews__stars rating__stars">
						<span style={{ width: `${reviewData.rating * 20}%` }}></span>
						<span className="visually-hidden">Rating</span>
					</div>
				</div>
				<p className="reviews__text">{reviewData.comment}</p>
				<time className="reviews__time" dateTime="2019-04-24">
					{dateConvert(reviewData.date)}
				</time>
			</div>
		</li>
	);
}

export default ReviewsItem;
