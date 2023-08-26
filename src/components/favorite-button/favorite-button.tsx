import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/useSelectors';
import classNames from 'classnames';
import { useNavigate } from 'react-router-dom';
import {
	AppRouter,
	AuthStatus,
	FavoriteStatus,
	RequestStatus,
} from '../../constants';
import { changeFavorite, fetchFavorites } from '../../store/thunks/favorites';
import { toast } from 'react-hot-toast';

interface FavoriteButtonProps {
	isFavorite?: boolean;
	offerId: string;
	width: number;
	bemClassTitle: string;
}

const enum Default {
	HeightRatio = 18 / 17,
}

function FavoriteButton({
	isFavorite,
	offerId,
	width,
	bemClassTitle,
}: FavoriteButtonProps) {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const status = useAppSelector((state) => state.favoritesData.status);
	const authStatus = useAppSelector(
		(state) => state.authData.authorizationStatus
	);

	const [isOn, setIsOn] = useState(isFavorite);

	const favoriteLabel = `${isOn ? 'In' : 'To'} bookmarks`;
	const buttonClassName = `${bemClassTitle}__bookmark-button`;

	const activeClassName = classNames(
		buttonClassName,
		{
			[`${buttonClassName}--active`]: isOn,
		},
		'button'
	);

	const height = width * Default.HeightRatio;

	const handleClick = () => {
		if (authStatus !== AuthStatus.Auth) {
			return navigate(AppRouter.Login);
		}

		dispatch(
			changeFavorite({
				offerId,
				status: isOn
					? FavoriteStatus.DeleteFavorite
					: FavoriteStatus.AddFavorite,
			})
		).then((res) => {
			if (res.meta.requestStatus === 'fulfilled') {
				setIsOn((prev) => !prev);
				dispatch(fetchFavorites());
			}
			if (res.meta.requestStatus === 'rejected') {
				toast.error('Something went wrong.');
			}
		});
	};

	return (
		<button
			className={activeClassName}
			disabled={status === RequestStatus.Loading}
			onClick={handleClick}
			type="button"
		>
			<svg
				className={`${bemClassTitle}__bookmark-icon`}
				height={height}
				width={width}
			>
				<use xlinkHref="#icon-bookmark" />
			</svg>
			<span className="visually-hidden">{favoriteLabel}</span>
		</button>
	);
}

export default FavoriteButton;
