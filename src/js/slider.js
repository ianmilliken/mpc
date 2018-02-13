import Siema from 'siema';

export default function slider() {

	console.log('slider has loaded');
	console.log('----------------------------------------');

	const slider = new Siema({
		loop: true
	});
	document.querySelector('.siema__prev').addEventListener('click', () => slider.prev());
	document.querySelector('.siema__next').addEventListener('click', () => slider.next());
}
