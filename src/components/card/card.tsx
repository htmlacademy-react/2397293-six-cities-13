import { Link } from 'react-router-dom';
import FavoriteButton from '../favorite-button/favorite-button';

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
					<FavoriteButton
						bemClassTitle="place-card"
						offerId={id}
						isFavorite={isFavorite}
						width={18}
					/>
				</div>
				<div className="place-card__rating rating">
					<div className="place-card__stars rating__stars">
						<span style={{ width: `${Math.round(rating) * 20}%` }}></span>
						<span className="visually-hidden">Rating</span>
					</div>
				</div>
				<h2 className="place-card__name">
					<Link to={`/offer/${id}`}>{title}</Link>
				</h2>
				<p className="place-card__type">
					{type[0].toUpperCase() + type.slice(1)}
				</p>
			</div>
		</article>
	);
}

export default Card;
