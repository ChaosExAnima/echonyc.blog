async function renderStars() {
	const stars = document.getElementById('stars');

	if (!stars) {
		throw new Error('Stars element not found');
	}

	const size = 1000;
	const canvas = new OffscreenCanvas(size, size);

	const context = canvas.getContext('2d');

	if (!context) {
		throw new Error('2d context not supported');
	}

	const starCount = 300;
	const maxSize = 2;

	for (let i = 0; i < starCount; i++) {
		const size = Math.random() * maxSize;
		const x = Math.random() * canvas.width - maxSize;
		const y = Math.random() * canvas.height - maxSize;

		const hue = Math.floor(Math.random() * 180);
		const luminance = 75 + Math.floor(Math.random() * 25);
		context.fillStyle = `hsl(${hue}, 50%, ${luminance}%)`;
		context.beginPath();
		context.arc(x, y, size, 0, 2 * Math.PI);
		context.fill();
	}

	const blob = await canvas.convertToBlob();
	const url = URL.createObjectURL(blob);

	stars.style.backgroundImage = `url(${url})`;
	stars.classList.remove('opacity-0');
	Array.from(stars.children).forEach((child) =>
		child.classList.remove('opacity-0'),
	);
}

renderStars();
