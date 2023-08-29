import { HTMLAttributes, memo } from 'react';
import { Link as RouterLink } from 'react-router-dom';

type LinkProps = Pick<
	HTMLAttributes<HTMLAnchorElement>,
	'children' | 'className' | 'onClick'
> & { href: string };

function Link_({ children, href, ...props }: LinkProps) {
	const isExternal = href.startsWith('http');
	const isAnchor = href.startsWith('#');

	if (isExternal) {
		return (
			<a href={href} rel="noopener noreferrer" target="_blank" {...props}>
				{children}
			</a>
		);
	}

	if (isAnchor) {
		return (
			<a href={href} {...props}>
				{children}
			</a>
		);
	}

	return (
		<RouterLink to={href} {...props}>
			{children}
		</RouterLink>
	);
}

export const Link = memo(Link_);
