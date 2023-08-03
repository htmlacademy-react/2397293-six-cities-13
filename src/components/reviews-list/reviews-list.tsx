import { IReviewsItem } from '../../types/types';
import ReviewsItem from '../reviews-item/reviews-item';

interface ReviewsListProps {
	offerReviews: IReviewsItem[];
}

function ReviewsList({ offerReviews }: ReviewsListProps) {
	return (
		<ul className="reviews__list">
			{offerReviews.map((offerReview) => (
				<ReviewsItem reviewData={offerReview} key={offerReview.id} />
			))}
		</ul>
	);
}

export default ReviewsList;
