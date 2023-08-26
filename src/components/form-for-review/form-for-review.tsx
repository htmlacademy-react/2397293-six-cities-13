import { FormEvent, useEffect, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/useSelectors';
import { RequestStatus } from '../../constants';
import { fetchComments, postComment } from '../../store/thunks/comments';
import { toast } from 'react-hot-toast';

const MIN_TEXT_LENGTH = 50;
const MAX_TEXT_LENGTH = 300;

type CommentField = HTMLFormElement & {
	review: HTMLTextAreaElement;
	rating: HTMLInputElement;
};

interface FormForReviewProps {
	offerId: string;
}

function FormForReview({ offerId }: FormForReviewProps) {
	const dispatch = useAppDispatch();

	const postCommentStatus = useAppSelector(
		(state) => state.reviewsData.postCommentStatus
	);
	const formRef = useRef<HTMLFormElement | null>(null);

	const [comment, setComment] = useState<string>('');
	const [selectedStars, setSelectedStars] = useState<number>(0);

	const isSuccess = postCommentStatus === RequestStatus.Success;
	const isFormDisabled =
		postCommentStatus === RequestStatus.Loading ||
		comment.length < MIN_TEXT_LENGTH ||
		comment.length > MAX_TEXT_LENGTH ||
		selectedStars === 0;
	const isInputDisabled = postCommentStatus === RequestStatus.Loading;

	const handlePostComment = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const form = event.currentTarget as CommentField;
		if (offerId) {
			toast.promise(
				dispatch(
					postComment({
						body: {
							comment: form.review.value,
							rating: Number(form.rating.value),
						},
						offerId,
					})
				).unwrap(),
				{
					error: <b>Failed.</b>,
					loading: 'Loading...',
					success: <b>Review sent!</b>,
				}
			);
		}
	};

	useEffect(() => {
		if (isSuccess) {
			formRef.current?.reset();
			setComment('');
			setSelectedStars(0);
			dispatch(fetchComments(offerId));
		}
	}, [isSuccess, dispatch, offerId]);

	return (
		<form
			className="reviews__form form"
			action="#"
			method="post"
			ref={formRef}
			onSubmit={handlePostComment}
		>
			<label className="reviews__label form__label" htmlFor="review">
				Your review
			</label>
			<div className="reviews__rating-form form__rating">
				<input
					className="form__rating-input visually-hidden"
					name="rating"
					value="5"
					id="5-stars"
					type="radio"
					checked={selectedStars === 5}
					onChange={() => setSelectedStars(5)}
				/>
				<label
					htmlFor="5-stars"
					className="reviews__rating-label form__rating-label"
					title="perfect"
				>
					<svg className="form__star-image" width="37" height="33">
						<use href="#icon-star"></use>
					</svg>
				</label>

				<input
					className="form__rating-input visually-hidden"
					name="rating"
					value="4"
					id="4-stars"
					type="radio"
					checked={selectedStars === 4}
					onChange={() => setSelectedStars(4)}
				/>
				<label
					htmlFor="4-stars"
					className="reviews__rating-label form__rating-label"
					title="good"
				>
					<svg className="form__star-image" width="37" height="33">
						<use href="#icon-star"></use>
					</svg>
				</label>

				<input
					className="form__rating-input visually-hidden"
					name="rating"
					value="3"
					id="3-stars"
					type="radio"
					checked={selectedStars === 3}
					onChange={() => setSelectedStars(3)}
				/>
				<label
					htmlFor="3-stars"
					className="reviews__rating-label form__rating-label"
					title="not bad"
				>
					<svg className="form__star-image" width="37" height="33">
						<use href="#icon-star"></use>
					</svg>
				</label>

				<input
					className="form__rating-input visually-hidden"
					name="rating"
					value="2"
					id="2-stars"
					type="radio"
					checked={selectedStars === 2}
					onChange={() => setSelectedStars(2)}
				/>
				<label
					htmlFor="2-stars"
					className="reviews__rating-label form__rating-label"
					title="badly"
				>
					<svg className="form__star-image" width="37" height="33">
						<use href="#icon-star"></use>
					</svg>
				</label>

				<input
					className="form__rating-input visually-hidden"
					name="rating"
					value="1"
					id="1-star"
					type="radio"
					checked={selectedStars === 1}
					onChange={() => setSelectedStars(1)}
				/>
				<label
					htmlFor="1-star"
					className="reviews__rating-label form__rating-label"
					title="terribly"
				>
					<svg className="form__star-image" width="37" height="33">
						<use href="#icon-star"></use>
					</svg>
				</label>
			</div>
			<textarea
				className="reviews__textarea form__textarea"
				id="review"
				name="review"
				placeholder="Tell how was your stay, what you like and what can be improved"
				value={comment}
				onChange={(e) => setComment(e.target.value)}
				disabled={isInputDisabled}
			/>
			<div className="reviews__button-wrapper">
				<p className="reviews__help">
					To submit review please make sure to set{' '}
					<span className="reviews__star">rating</span> and describe your stay
					with at least <b className="reviews__text-amount">50 characters</b>.
				</p>
				<button
					className="reviews__submit form__submit button"
					type="submit"
					disabled={isFormDisabled}
				>
					Submit
				</button>
			</div>
		</form>
	);
}

export default FormForReview;
