import { useEffect, useRef, useState } from 'react';
import { Sorting } from '../../types/types';
import { useAppDispatch, useAppSelector } from '../../hooks/useSelectors';
import { SortingTypes } from '../../constants';
import classNames from 'classnames';
import { offersActions } from '../../store/offers-data/offers-data';

const SortingForm = () => {
	const dispatch = useAppDispatch();

	const [isOpen, setIsOpen] = useState<boolean>(false);

	const { sorting } = useAppSelector((state) => state.offersData);

	const sortingListElement = useRef<HTMLUListElement | null>(null);
	const sortingElement = useRef<HTMLSpanElement | null>(null);

	const iconStyle = {
		transform: `translateY(-50%) ${isOpen ? 'rotate(180deg)' : ''}`,
		transition: '.2s',
	};

	function handleSorting(type: Sorting) {
		setIsOpen(false);
		dispatch(offersActions.setSorting(type));
	}

	useEffect(() => {
		const handler = (e: MouseEvent) => {
			if (
				!sortingListElement.current?.contains(e.target as Node | null) &&
				!sortingElement.current?.contains(e.target as Node | null)
			) {
				setIsOpen(false);
			}
		};
		document.addEventListener('mousedown', handler);

		return () => {
			document.removeEventListener('mousedown', handler);
		};
	});

	return (
		<form className="places__sorting" action="#" method="get">
			<span className="places__sorting-caption">Sort by</span>{' '}
			<span
				className="places__sorting-type"
				ref={sortingElement}
				tabIndex={0}
				onClick={() => setIsOpen((prev) => !prev)}
			>
				{SortingTypes[sorting]}
				<svg
					style={iconStyle}
					className="places__sorting-arrow"
					width="7"
					height="4"
				>
					<use href="#icon-arrow-select"></use>
				</svg>
			</span>
			<ul
				ref={sortingListElement}
				className={classNames('places__options', 'places__options--custom', {
					'places__options--opened': isOpen,
				})}
			>
				{Object.entries(SortingTypes).map(([type, title]) => (
					<li
						key={type}
						className={classNames('places__option', {
							'places__option--active': sorting === type,
						})}
						tabIndex={0}
						onClick={() => handleSorting(type as Sorting)}
					>
						{title}
					</li>
				))}
			</ul>
		</form>
	);
};

export default SortingForm;
