import { useMemo, type PropsWithChildren } from 'react';
import { thumbHashToDataURL } from 'thumbhash';

interface ImageProps {
	hash?: string;
	className?: string;
}

export default function ImagePlaceholder({
	hash,
	children,
	className = '',
}: PropsWithChildren<ImageProps>) {
	if (!hash) {
		return children;
	}
	const dataUrl = useMemo(
		() => thumbHashToDataURL(convertDataURIToBinary(hash)),
		[hash],
	);
	return (
		<div
			style={{ backgroundImage: `url(${dataUrl})` }}
			className={`${className} bg-cover text-transparent`}
		>
			{children}
		</div>
	);
}

function convertDataURIToBinary(hash: string) {
	return Uint8Array.from(window.atob(hash), (v) => v.charCodeAt(0));
}
