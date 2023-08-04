import classNames from 'classnames';
import { Link } from 'react-router-dom';

interface CardProps {
	id: string;
	isPremium: boolean;
	isFavorite: boolean;
	price: number;
	rating: number;
	title: string;
	type: string;
	previewImage?: string;
	bemClassTitle: string;
	onMouseEnter?: () => void;
	onMouseLeave?: () => void;
}

function Card({
	id,
	isPremium,
	isFavorite,
	price,
	rating,
	title,
	type,
	previewImage,
	bemClassTitle,
	onMouseEnter,
	onMouseLeave,
}: CardProps) {
	const bookmarkClassName = classNames(
		'place-card__bookmark-button',
		'button',
		{ 'place-card__bookmark-button--active': isFavorite }
	);
	const bookmarkLabel = `${isFavorite ? 'In' : 'To'} bookmarks`;

	return (
		<article
			className={`place-card ${bemClassTitle}__card`}
			onMouseEnter={onMouseEnter}
			onMouseLeave={onMouseLeave}
		>
			{isPremium && (
				<div className="place-card__mark">
					<span>Premium</span>
				</div>
			)}

			<div
				className={`${bemClassTitle}__image-wrapper place-card__image-wrapper`}
			>
				<Link to={`/offer/${id}`}>
					<img
						className="place-card__image"
						src={previewImage}
						width={bemClassTitle === 'favorites' ? 150 : 260}
						height={bemClassTitle === 'favorites' ? 110 : 200}
						alt="Place image"
					/>
				</Link>
			</div>
			<div className="place-card__info">
				<div className="place-card__price-wrapper">
					<div className="place-card__price">
						<b className="place-card__price-value">&euro;{price}</b>
						<span className="place-card__price-text">&#47;&nbsp;night</span>
					</div>
					<button className={bookmarkClassName} type="button">
						<svg className="place-card__bookmark-icon" width={18} height={19}>
							<use href="#icon-bookmark"></use>
						</svg>
						<span className="visually-hidden">{bookmarkLabel}</span>
					</button>
				</div>
				<div className="place-card__rating rating">
					<div className="place-card__stars rating__stars">
						<span style={{ width: `${rating * 20}%` }}></span>
						<span className="visually-hidden">Rating</span>
					</div>
				</div>
				<h2 className="place-card__name">
					<Link to={`/offer/${id}`}>{title}</Link>
				</h2>
				<p className="place-card__type">{type}</p>
			</div>
		</article>
	);
}

export default Card;
