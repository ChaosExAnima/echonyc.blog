import { thumbHashToDataURL } from 'thumbhash';

const hashElements = document.querySelectorAll('[data-hash]');

for (const element of hashElements) {
	if (element instanceof HTMLElement) {
		const hash = element.dataset.hash;
		if (!hash) {
			continue;
		}
		if (hash.includes('-')) {
			imagePlaceholder(element, hash);
		} else {
			blurryImage(element, hash);
		}
		imageFadeOnLoad(element);
	}
}

function blurryImage(wrapper: HTMLElement, hash: string) {
	const thumbHash = Uint8Array.from(window.atob(hash), (v) =>
		v.charCodeAt(0),
	);
	const dataUrl = thumbHashToDataURL(thumbHash);
	wrapper.style.backgroundImage = `url(${dataUrl})`;
}

function imageFadeOnLoad(wrapper: HTMLElement) {
	const image = wrapper.querySelector('img');
	if (!image) {
		return;
	}
	image.addEventListener('load', () => {
		setTimeout(() => {
			image.classList.remove('opacity-0');
		}, 200); // Magic number as it doesn't appear to fade in without it.
	});
}
function imagePlaceholder(wrapper: HTMLElement, hash: string) {
	const [deg, colors] = hash.split('-');
	const gradient = colors
		.split('')
		.map((hex) => `#${hex.repeat(3)}`)
		.join(',');
	wrapper.style.background = `linear-gradient(${deg}deg, ${gradient})`;
}
