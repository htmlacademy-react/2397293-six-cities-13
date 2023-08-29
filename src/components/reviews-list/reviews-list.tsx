import { IReviewsItem } from '../../types/types';
import ReviewsItem from '../reviews-item/reviews-item';

const MAX_REVIEWS_COUNT = 10;

interface ReviewsListProps {
	offerReviews: IReviewsItem[];
}

function ReviewsList({ offerReviews }: ReviewsListProps) {
	const reviewsRender = [...offerReviews]
		.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
		.slice(0, MAX_REVIEWS_COUNT);

	return (
		<ul className="reviews__list">
			{reviewsRender.map((offerReview) => (
				<ReviewsItem reviewData={offerReview} key={offerReview.id} />
			))}
		</ul>
	);
}

export default ReviewsList;
