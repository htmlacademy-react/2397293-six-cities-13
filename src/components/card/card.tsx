import classNames from 'classnames';
import React from 'react';

interface CardProps {
	isPremium: boolean;
	isFavorite: boolean;
	price: number;
	rating: number;
	description: string;
	type: string;
	imageSrc: string;
}

const Card: React.FC<CardProps> = ({
	isPremium,
	isFavorite,
	price,
	rating,
	description,
	type,
	imageSrc,
}) => {
	const bookmarkClassName = classNames(
		'place-card__bookmark-button',
		'button',
		{ 'place-card__bookmark-button--active': isFavorite }
	);
	const bookmarkLabel = `${isFavorite ? 'In' : 'To'} bookmarks`;

	return (
		<article className="cities__card place-card">
			{isPremium && (
				<div className="place-card__mark">
					<span>Premium</span>
				</div>
			)}

			<div className="cities__image-wrapper place-card__image-wrapper">
				<a href="#">
					<img
						className="place-card__image"
						src={imageSrc}
						width={260}
						height={200}
						alt="Place image"
					/>
				</a>
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
					<a href="#">{description}</a>
				</h2>
				<p className="place-card__type">{type}</p>
			</div>
		</article>
	);
};

export default Card;
